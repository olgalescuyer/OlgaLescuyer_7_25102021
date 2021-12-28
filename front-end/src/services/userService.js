import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const config = { headers: authHeader() };
const user = JSON.parse(localStorage.getItem("user"));

const getOneUser = (userId) => {
  return axios.get(API_URL + "auth/" + userId, config);
};

const getAllPosts = () => {
  return axios.get(API_URL + "posts", config);
};

const postOnePost = (postData) => {
  const options = {
    method: "post",
    url: API_URL + "posts",
    headers:{Authorization: 'Bearer ' + user, "content-type": "multipart/form-data" },

    data: postData,
  };
  console.log("options from services axios : ",options);

  return axios(options);
};

export default { getAllPosts, getOneUser, postOnePost };
