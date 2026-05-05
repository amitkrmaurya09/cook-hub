/// src/api/axios.js
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((req) => {
  // console.log('reach here...')
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});