import axios from "axios";


   // used to if server is in use
// const Ports = import.meta.env.PORT || 3004;

export const axiosInstance = axios.create({
  //local endpoint reference
  // baseURL: `http://localhost:${Ports}/api`,

  // deployed endpoint reference
  baseURL: "http://localhost:3004/api/",
});
