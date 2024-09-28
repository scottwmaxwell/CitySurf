import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Get connection string from environment file
let uri: any;
if (process.env.ENV == "production") {
  uri = process.env.MONGODBCONNECTSTRING;
} else {
  uri = process.env.LOCALDB;
}

// Setup client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Used for all database executions and queries
const executeMongoDBOperation = async (
  collectionName: string,
  operation: string,
  data: any,
  id?: any,
  filter?: any
) => {
  // Open client connection
  await client.connect();

  // set database
  const database = client.db("CitySurf");

  // set collection
  const collection = database.collection(collectionName);

  try {
    switch (operation) {
      case "find":
        if (filter) {
          return await collection.find(data, { projection: filter }).toArray();
        } else {
          return await collection.find(data).toArray();
        }
      case "findone":
        return await collection.findOne(data); // Performs findOne query on database
      case "insert":
        await collection.insertOne(data); // Performs insertOne execution on database
        return "Insert successful";
      case "update":
        await collection.updateOne({ _id: id }, data); // Performs an update on database
        return "Update successful";
      case "delete":
        await collection.deleteOne(data); // Performs a deletion of one document in the database
        return "Delete successful";
      default:
        console.log(operation);
        throw new Error("Invalid operation specified");
    }
  } catch (e) {
    console.log(e);
  }
};

export default executeMongoDBOperation;
