import { Request, RequestHandler, Response} from 'express';
import executeMongoDBOperation from '../services/mongodb.connector';
import { ObjectId } from 'mongodb';
import City from '../models/models.city';

export const getCity: RequestHandler = async(req: Request, res: Response)=>{

    let cityId:any = req.query.id;
    let cityName:any = req.query.cityname;
    let cityState: any = req.query.citystate;

    console.log("cityState: " + cityState);

    if(cityId){
        try{
            const results = await executeMongoDBOperation("cities", "find", {_id: new ObjectId(cityId)});
            if(results && results.length > 0 && Array.isArray(results)){
                const cityResult = results[0];
                if(cityResult && (typeof cityResult=== 'object') && ('_id' in cityResult)){
                    const city:City = {
                        _id: cityResult._id,
                        name: cityResult.name,
                        state: cityResult.state,
                        description: cityResult.description
                    }
                    res.status(200).json(
                        city
                    );
                }else{
                    res.status(400).send("Invalid Request")
                }
            }

        }catch(e){
            console.log(e);
            res.status(500).send("Server Error");
        }
    }else if(cityState && cityName){
        const city = await executeMongoDBOperation("cities", "findone", {city: cityName, state:cityState});
        if(city){
            res.status(200).json(
                city
            );
        }
    }else{
        console.log("Here")
        res.status(400).send("Invalid Request");
    }
}



