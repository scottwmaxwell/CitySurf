import { ObjectId } from 'mongodb';
import executeMongoDBOperation from '../services/mongodb.connector';
import { Request, RequestHandler, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { generateToken, verifyToken } from '../services/auth'; // Adjust the path as necessary
import { CustomJwtPayload } from '../types/expresss';


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

export const createUser: RequestHandler = async(req: Request, res: Response)=>{
    try{

        // Generates salt and creates password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);

        if(await executeMongoDBOperation('users', 'findone', {'email': req.body.email }) == null){
            executeMongoDBOperation('users', 'insert', {email: req.body.email, password:hashedPassword, cities: []})
        }else{
            return res.status(400).send('User exists')
        }

    }catch(e){
        console.log(e);
    }

    res.status(201).send();
}

export const authenticateUser: RequestHandler = async(req: Request, res: Response)=>{
    
    try{
        // Get User from MongoDB
        const user:any = await executeMongoDBOperation('users', 'findone', {'email': req.body.email });

        if(!user){
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

export const updateUser: RequestHandler = async(req: Request, res: Response)=>{
        // Get user
        let userId = getUserIdFromRequest(req);
}

export const deleteUser: RequestHandler = async(req: Request, res: Response)=>{
        let userId = getUserIdFromRequest(req);
}

export const deleteCity: RequestHandler = async(req: Request, res: Response)=>{
        let userId = getUserIdFromRequest(req);
        if(userId){

        }else{
            res.status(500).send("Server Error");
        }

}

const getUserIdFromRequest = (req: Request) => {
    // Get user
    let user:any = req.user;
    let userId;
    if(user){
        console.log(user.userId);
        userId = user.userId;
        return userId;
    }else{
        return null;
    }
}