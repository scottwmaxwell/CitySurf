import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

let uri: any;
if(process.env.ENV == 'production'){
    uri = process.env.MONGODBCONNECTSTRING;
}else{
    uri = process.env.LOCALDB;
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const executeMongoDBOperation = async (collectionName:string, operation:string, data:any, id?:any, filter?:any) =>{

    await client.connect();
    const database = client.db('CitySurf');
    const collection = database.collection(collectionName);

    try{
        switch (operation) {
            case 'find':
              if(filter){
                return await collection.find(data, { projection: filter }).toArray();
              }else{
                return await collection.find(data).toArray();
              }
            case 'findone':
              return await collection.findOne(data);
            case 'insert':
              await collection.insertOne(data);
              return 'Insert successful';
            case 'update':
              await collection.updateOne({_id: id}, data);
              return 'Update successful';
            case 'delete':
              await collection.deleteOne(data);
              return 'Delete successful'
            default:
              console.log(operation)
              throw new Error('Invalid operation specified');
          }
    }catch(e){
        console.log(e);
    }
}

export default executeMongoDBOperation;