import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/User", 
  withCredentials: true
});

export default API;
