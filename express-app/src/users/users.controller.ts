import { ObjectId } from 'mongodb';
import executeMongoDBOperation from '../services/mongodb.connector';
import { Request, RequestHandler, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { generateToken, verifyToken } from '../services/auth'; // Adjust the path as necessary
import { CustomJwtPayload } from '../types/expresss';
import User from '../models/models.user';
import { PasswordCheckService } from '../services/PasswordCheckService';


// Protected: requires valid session
export const getSavedCities: RequestHandler = async(req: Request, res: Response)=>{
    try{
        let userId = getUserIdFromRequest(req);
        let cities;
        if(userId){
            try{
                cities = await executeMongoDBOperation('users', 'find', { _id: new ObjectId(userId) }, null, { cities: 1, _id: 0 })
            }catch(e){
                console.log(e)
                res.status(400).send("Invalid Request")
            }
        }

        res.status(200).json(
            cities
        );

    }catch(e){
        res.status(500).send("Server Error");
        console.log(e);
    }   
}

// Used to create a user in mongoDb
export const createUser: RequestHandler = async(req: Request, res: Response)=>{
    console.log("/createUser");

    const passwordService = new PasswordCheckService();

    const password = req.body.password;
    const email = req.body.email;

    // Check password strength
    if(passwordService.checkPasswordStrength(password) < 3){
        console.log("password too weak")
        return res.status(400).send({message:'Password too weak'});
    }
    try{
        // Generates salt and creates password
        const hashedPassword = await bcrypt.hash(password, 10);
        if(await executeMongoDBOperation('users', 'findone', {'email': email }) == null){
            executeMongoDBOperation('users', 'insert', {email: email, password:hashedPassword, cities: []})
        }else{
            console.log("User already exists");
            return res.status(400).send({message:'User already exists'});
        }

    }catch(e){
        console.log("An error occurred:");
        console.log(e);
    }

    // User registered (success response)
    return res.status(201).send({message:'Success'});
}

// Returns a session token for authentication
export const authenticateUser: RequestHandler = async(req: Request, res: Response)=>{
    
    try{
        // Get User from MongoDB
        const user:any = await executeMongoDBOperation('users', 'findone', {'email': req.body.email });

        if(!user){
            console.log("Cannot find user");
            return res.status(400).send('Cannot find user')
        }

        if(await bcrypt.compare(req.body.password, user.password)){

            // Generate session
            const token = generateToken({ userId: user._id, email: user.email });
            res.status(200).send({message: 'Success', token});
        }else{
            res.status(401).send("Not Allowed")
        }

    }catch(e){
        res.status(500).send();
        console.log("Error: " + e);
    }

    res.status(201).send();
}

// Not Yet Required
export const updateUser: RequestHandler = async(req: Request, res: Response)=>{
        let userId = getUserIdFromRequest(req);
        // TODO: ~ update user by Id
}

// Not Yet Required
export const deleteUser: RequestHandler = async(req: Request, res: Response)=>{
        let userId = getUserIdFromRequest(req);
        // TODO: ~ delete user by Id
}

// Deletes a city from a user's saved cities
export const deleteCity: RequestHandler = async(req: Request, res: Response)=>{
    let userId = getUserIdFromRequest(req);
    let cityId = String(req.query.id);
    const cityIdToRemove = new ObjectId(cityId);
    if(userId){
        try{
            let result = await executeMongoDBOperation('users', 'update', { $pull: { cities: cityIdToRemove } }, new ObjectId(userId));
            console.log(result);
            res.status(200).send("City Removed");
        }catch(e){
            console.log(e);
            res.status(500).send("Server Error");
        }
    }else{
        res.status(500).send("Server Error");
    }
}

// Used to save a city to a user's saved cities array in mongoDB
export const saveCity: RequestHandler = async(req: Request, res: Response)=>{
    let userId = getUserIdFromRequest(req);
    let cityId = String(req.query.id);
    const cityIdToAdd = new ObjectId(cityId);
    if(userId){
        try{
            let result = await executeMongoDBOperation('users', 'update', { $push: { cities: cityIdToAdd } }, new ObjectId(userId));
            if(result){
                res.status(200).send("City Added");
            }
        }catch(e){
            console.log(e);
        }

    }else{
        res.status(500).send("Server Error");
    }
}

// Helper function used to determine the userId based on the incoming request
const getUserIdFromRequest = (req: Request) => {
    // Get user from request
    let user:any = req.user;
    let userId;
    if(user){
        userId = user.userId;
        return userId;
    }else{
        return null;
    }
}