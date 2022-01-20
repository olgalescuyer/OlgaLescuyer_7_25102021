import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const signup = (data) => {
  return axios.post(API_URL + "signup", data);
};

const login = (data) => {
  console.log(data);
  return axios.post(API_URL + "login", data);
};


export default  { signup, login};
