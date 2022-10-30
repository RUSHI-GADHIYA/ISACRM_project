import axios from "axios";
import { API_ENDOINT } from "../config/constants";

// This is the axios instance created for the application
// It is used to make API calls
const instance = axios.create({
  baseURL: API_ENDOINT,
  timeout: 5000,
});

// Export an object containing axios instance
export default instance;
