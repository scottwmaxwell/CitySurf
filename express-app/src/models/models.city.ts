import { ObjectId } from "mongodb";

// city object
export default interface city {
  _id: ObjectId;
  name: String;
  state: String;
  description: String;
}
