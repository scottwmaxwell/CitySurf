import axios from "axios";

// Creates connection to backend
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
