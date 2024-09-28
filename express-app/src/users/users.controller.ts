import { ObjectId } from "mongodb";
import executeMongoDBOperation from "../services/mongodb.connector";
import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../services/auth";
import { PasswordCheckService } from "../services/PasswordCheckService";
import { sendMail } from "../services/mailService";
import {logger} from '../middleware/logger';

// Protected: requires valid session
export const getSavedCities: RequestHandler = async (
  req: Request,
  res: Response
) => {
  logger.info("called getSavedCities");
  try {
    let userId = getUserIdFromRequest(req);
    let cities;
    if (userId) {
      try {
        // Find savedcities from database based on userId
        cities = await executeMongoDBOperation(
          "users",
          "find",
          { _id: new ObjectId(userId) },
          null,
          { cities: 1, _id: 0 }
        );
      } catch (e) {
        logger.error(`An error occurred: ${e}`)
        res.status(400).send("Invalid Request");
      }
    }
    res.status(200).json(cities);
  } catch (e) {
    res.status(500).send("Server Error");
    logger.error(`Server Error: ${e}`);
  }
};

// Used to create a user in mongoDb
export const createUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  logger.info('createUser');
  const passwordService = new PasswordCheckService(); // Initialize passwordService

  const password:string = req.body.password;
  const email:string = req.body.email;

  logger.info(`Attempting to create user for ${email}`);

  // Check password strength
  if (passwordService.checkPasswordStrength(password) < 3) {
    logger.error('Password to weak');
    return res.status(400).send({ message: "Password too weak" });
  }
  try {
    // Generates salt and creates password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (
      // ensure email does not already exist in database
      (await executeMongoDBOperation("users", "findone", { email: email })) ==
      null
    ) {
      // Insert user into database
      await executeMongoDBOperation("users", "insert", {
        email: email,
        password: hashedPassword,
        cities: [],
      });
    } else {
      logger.error("Failed to create user - user already exists");
      return res.status(400).send({ message: "User already exists" });
    }
  } catch (e) {
    console.log("An error occurred:");
    logger.error(`Server Error: ${e}`);
  }

  logger.info(`User ${email} registered`);

  // User registered (success response)
  return res.status(201).send({ message: "Success" });
};

// Returns a session token for authentication
export const authenticateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    logger.info('authenticateUser');
    // Get User from MongoDB
    const user: any = await executeMongoDBOperation("users", "findone", {
      email: req.body.email,
    });

    // If user does not exist return
    if (!user) {
      logger.info('User does not exist');
      return res.status(400).send("Cannot find user");
    }

    // If user exists and password matches hash
    if (await bcrypt.compare(req.body.password, user.password)) {
      logger.info(`Authenticating user ${user.email}`);
      // Generate session and return
      const token = generateToken({ userId: user._id, email: user.email });
      res.status(200).send({ message: "Success", token });
    } else {
      console.log("Not allowed");
      res.status(401).send("Not Allowed");
    }
  } catch (e) {
    res.status(500).send();
    logger.error(`Server error:${e}`);
  }

  logger.info('Authentication failed');
  res.status(201).send();
};

// Deletes a city from a user's saved cities
export const deleteCity: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let userId = getUserIdFromRequest(req);
  let cityId = String(req.query.id);
  const cityIdToRemove = new ObjectId(cityId);

  // If userId exists in sessions
  if (userId) {
    try {
      // execute on database to delete city for user
      let result = await executeMongoDBOperation(
        "users",
        "update",
        { $pull: { cities: cityIdToRemove } },
        new ObjectId(userId)
      );
    } catch (e) {
      logger.error(`Server Error: ${e}`);
      res.status(500).send("Server Error");
    }
  } else {
    logger.error('Invalid Request');
    res.status(400).send("Invalid Request");
  }
  logger.info(`City ${cityId} removed for ${userId}`);
  return res.status(200).send("City Removed");
};

// Used to save a city to a user's saved cities array in mongoDB
export const saveCity: RequestHandler = async (req: Request, res: Response) => {

  logger.info('saveCity');

  let userId = getUserIdFromRequest(req); // Used to get userId from session
  let cityId = String(req.query.id);   // Get query items from request
  const cityIdToAdd = new ObjectId(cityId); // Create Mongo ObjectId
  if (userId) {
    try {

      // Update user with new city in MongoDB
      let result = await executeMongoDBOperation(
        "users",
        "update",
        { $addToSet: { cities: cityIdToAdd } },
        new ObjectId(userId)
      );
      if (result) {
        logger.info(`City ${cityId} added for ${userId}`);
        res.status(200).send("City Added");
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(500).send("Server Error");
  }
};

export const requestReset: RequestHandler = async (req: Request, res: Response) => {

  logger.info('requestReset');

  const email:string = req.query.email as string;
  const message:string = "If the email exists, you will receive a code shortly.";

  // Find one user in database based on email
  if(email){
    try{
      // Get User from MongoDB
      const user: any = await executeMongoDBOperation("users", "findone", {
        email: email,
      });

      if(user){

        //  If one is found, generate random 4-digit code
        const code:string = Math.floor(1000 + Math.random() * 9000).toString();

        //  hash the code
        const Hashedcode:string = await bcrypt.hash(code, 10);

        // generate datetime 10 minutes
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 10); // Set expiration time to 10 minutes from now

        // update the user's document with hashed code and an 10 min expiration date
        const result = await executeMongoDBOperation(
          "users",
          "update",
          { $set: { reset_token: {token: Hashedcode, expires: expiration }} },
          new ObjectId(user._id)
        );

        //  send an email to email sent with code
        const from: string = process.env.MAIL_USERNAME as string;
        const to: string = email;
        const subject: string = 'City Surf Password Reset';
        const mailTemplate: string = `<html><p>City Surf Password Reset Code: ${code}</p></html>`;

        sendMail(from, to, subject, mailTemplate);
        return res.status(200).json({ message: message });
      }
    }catch(e){
      logger.error(`An error occurred ${e}`);
      return res.status(400).send({message: "Problem Occurred"});
    }
  }

	//  If none are found, return
  logger.info(`No users found with email of ${email}`);
  return res.status(200).json({ message: message });
}

export const resetAuthorize: RequestHandler = async (req: Request, res: Response) => {

  logger.info('resetAuthorize');

  const email:string = req.query.email as string;
  const resetCode:string = req.query.resetCode as string;
  try{
	  // finds on user in database based on email
    const user: any = await executeMongoDBOperation("users", "findone", {
      email: email,
    });
    if(user){

        //  compares code with hash from db
        const codesMatch:boolean = await bcrypt.compare(resetCode, user.reset_token.token);

        // compare reset expiration time with current time
        const currentTime:number = new Date().getMinutes();
        const unexpired:boolean = (currentTime < user.reset_token.expires);

        // send token to authorize reset if code match and unexpired
        if(codesMatch && unexpired){
          // 10 minute token
          logger.info(`Generated password reset token for ${user._id}`)
          const token = generateToken({ userId: user._id, email: user.email }, "10m");
          return res.status(200).send({ message: "Success", token });
        }
    }
  }catch(e){
    console.log(e);
    logger.error(`An error occurred: ${e}`);
    return res.status(400).send({message: "Problem Occurred"});
  }

  // Return unauthorized
  logger.error("Unauthorized request");
  return res.status(401).send({message: "Not Authorized"});
}

export const passwordReset: RequestHandler = async (req: Request, res: Response) => {

  logger.info('passwordReset');

  const password = req.body.password;
  const userId = getUserIdFromRequest(req);

  const passwordService = new PasswordCheckService();
  // Check password strength
  if (passwordService.checkPasswordStrength(password) < 3) {
    logger.error("Password is too weak to reset");
    return res.status(400).send({ message: "Password too weak" });
  }

  try{
    // If userId exists from sessions
    if(userId){
        const hashedPassword = await bcrypt.hash(password, 10);
        // update the user's document with the new password
        const result = await executeMongoDBOperation(
          "users",
          "update",
          { $set: { password: hashedPassword} },
          new ObjectId(userId)
        );
        logger.info(`Reset password for ${userId}`);
        return res.status(200).send({message:"Success"});
    }
  }catch(e){
    console.log(e);
    logger.error(`An error occurred: ${e}`)
    return res.status(400).send({message: "Problem Occurred"});
  }

  logger.error("An unknown issue occurred resetting the password");
  return res.status(400).send({message: "Problem Occurred"});
}

// Helper function used to determine the userId based on the incoming request
const getUserIdFromRequest = (req: Request) => {
  // Get user from request
  let user: any = req.user;
  let userId;
  if (user) {
    userId = user.userId;
    return userId;
  }
  
  return null;
};
