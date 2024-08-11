import { ObjectId } from "mongodb";

export default interface city{
    _id: ObjectId,
    name: String,
    state: String, 
    description: String,
}