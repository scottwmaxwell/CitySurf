import { Request, RequestHandler, Response } from "express";
import executeMongoDBOperation from "../services/mongodb.connector";
import { ObjectId } from "mongodb";
import City from "../models/models.city";
import { CitySearchService } from "../services/CitySearchService";
import citydata from "../assets/citydata.json";
import { logger } from "../middleware/logger";

// Returns a single city by Id or by state and name
export const getCity: RequestHandler = async (req: Request, res: Response) => {
  logger.info("getCity");

  // Get query items
  const cityId: any = req.query.id;
  const cityName: any = req.query.cityname;
  const cityState: any = req.query.citystate;

  // get city by cityId
  if (cityId) {
    try {
      const results = await executeMongoDBOperation("cities", "find", {
        _id: new ObjectId(cityId),
      });
      if (results && results.length > 0 && Array.isArray(results)) {
        const cityResult = results[0];
        if (
          cityResult &&
          typeof cityResult === "object" &&
          "_id" in cityResult
        ) {
          const city: City = {
            _id: cityResult._id,
            name: cityResult.city,
            state: cityResult.state,
            description: cityResult.description,
          };
          logger.info(`retrieved city ${cityId}`);
          res.status(200).json(city);
        } else {
          logger.error("Invalid Request Sent");
          res.status(400).send("Invalid Request");
        }
      }
    } catch (e) {
      console.log(e);
      logger.error(`Server Error: ${e}`);
      res.status(500).send("Server Error");
    }

    // Get city by cityState and cityName
  } else if (cityState && cityName) {
    const city = await executeMongoDBOperation("cities", "findone", {
      city: cityName,
      state: cityState,
    });
    if (city) {
      logger.info(`retrieved city ${cityId}`);
      res.status(200).json(city);
    }
  } else {
    logger.error("Invalid Request");
    res.status(400).send("Invalid Request");
  }
};

// Returns the city document correlated to the latidue and logitude values passed
export const getCityByGeoloc: RequestHandler = async (
  req: Request,
  res: Response
) => {
  logger.info("getCityByGeoloc");

  // Get query items
  const cityLat: any = req.query.lat;
  const cityLon: any = req.query.lon;

  if (cityLat && cityLon) {
    try {
      // Create query with bounding box requirement
      const query = {
        boundingbox: {
          $geoIntersects: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(cityLon), parseFloat(cityLat)],
            },
          },
        },
      };

      const result = await executeMongoDBOperation("cities", "findone", query);
      logger.info("Retrieved city based on latitude and longitude");
      res.status(200).json(result);
    } catch (e) {
      logger.error(`An error occurred: ${e}`);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
};

// Returns cities based on sent string
// No logging as this end point will be called many times
export const getSuggestions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // get search from query
  const search = req.query.search as string;
  if (search) {
    // Create new searchService (fuse.js)
    const searchService = new CitySearchService();
    // Get results
    const results = searchService.findCity(search);
    return res.status(200).json(results);
  } else {
    return res.status(400).send("Invalid Request");
  }
};

// Returns GeoJSON object used for MapBox
export const getGeoJSON: RequestHandler = async (
  req: Request,
  res: Response
) => {
  logger.info("getGeoJSON");
  return res.status(200).json(citydata);
};

// Allows submission of ratings for a city
// Requires user authentication
export const rateCity: RequestHandler = async (req: Request, res: Response) => {
  logger.info("rateCity");
  const cleanliness = req.body.cleanliness;
  const safety = req.body.safety;
  const landmarks = req.body.landmarks;
  const education = req.body.education;
  const cityId = req.body.cityId;

  const metrics = {
    [`community_metrics.cleanliness.${parseInt(cleanliness)}`]: 1,
    [`community_metrics.safety.${parseInt(safety)}`]: 1,
    [`community_metrics.landmarks.${parseInt(landmarks)}`]: 1,
    [`community_metrics.education.${parseInt(education)}`]: 1,
  };

  try {
    await executeMongoDBOperation(
      "cities",
      "update",
      { $inc: metrics },
      new ObjectId(cityId)
    );
    logger.info(`Metrics submitted for ${cityId}`);
    res.status(200).send("Success");
  } catch (e) {
    logger.error(`An error occurred: ${e}`);
    res.status(400).send("Invalid Request");
  }
};
