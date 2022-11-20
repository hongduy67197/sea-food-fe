import axios from "axios";
export default axios.create({
  // baseURL: process.env.REACT_APP_CLIENT_URL,
  baseURL: process.env.REACT_APP_SEA_FOOD_URL,
});
