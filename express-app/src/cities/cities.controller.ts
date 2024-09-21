import { Request, RequestHandler, Response} from 'express';
import executeMongoDBOperation from '../services/mongodb.connector';
import { ObjectId } from 'mongodb';
import City from '../models/models.city';


// Returns a single city by Id or by state and name
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
                if(cityResult && (typeof cityResult === 'object') && ('_id' in cityResult)){
                    const city:City = {
                        _id: cityResult._id,
                        name: cityResult.city,
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
        res.status(400).send("Invalid Request");
    }
}

// Returns the city document correlated to 
// the latidue and logitude values passed
export const getCityByGeoloc: RequestHandler = async(req: Request, res: Response)=>{

    let cityLat:any = req.query.lat;
    let cityLon: any = req.query.lon;

    if(cityLat && cityLon){
        try{

            let query = {
                boundingbox: {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(cityLon), parseFloat(cityLat)]
                        }
                    }
                }
            }

            console.log(query);
            const result = await executeMongoDBOperation("cities", "findone", query);
            console.log("getCityByGeoloc");
            console.log(result);

            res.status(200).json(
                result
            );

        }catch(e){
            console.log(e);
        }

    }else{
        res.status(400).send("Invalid Request");
    }
}

// Allows submission of ratings for a city
// Requires user authentication
export const rateCity: RequestHandler = async(req: Request, res: Response)=>{

    console.log("RateCity");

    let cleanliness = req.body.cleanliness;
    let safety = req.body.safety;
    let landmarks = req.body.landmarks;
    let education = req.body.education;
    let cityId = req.body.cityId;

    console.log("cleanliness: " + cleanliness);

    let metrics = {
        [`community_metrics.cleanliness.${parseInt(cleanliness)}`]: 1,
        [`community_metrics.safety.${parseInt(safety)}`]: 1,
        [`community_metrics.landmarks.${parseInt(landmarks)}`]: 1,
        [`community_metrics.education.${parseInt(education)}`]: 1
    }

    try{
        await executeMongoDBOperation('cities', 'update', {$inc: metrics }, new ObjectId(cityId));
        res.status(200).send("Success");
    }catch(e){
        console.log(e);
        res.status(400).send("Invalid Request");
    }
}
