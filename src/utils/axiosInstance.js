import axios from "axios";

const MEDI_CARE_API = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: MEDI_CARE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
