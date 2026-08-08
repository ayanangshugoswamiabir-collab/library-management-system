import axios from "axios";


const api = axios.create({

  baseURL: "https://library-management-system-backend.onrender.com",

  headers: {
    "Content-Type": "application/json",
  },

});



// Attach JWT token automatically

api.interceptors.request.use(

  (config) => {


    const token = localStorage.getItem("token");



    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }



    return config;


  },


  (error) => {

    return Promise.reject(error);

  }

);



export default api;