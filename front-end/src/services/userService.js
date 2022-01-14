import axios from "axios";

const API_URL = "http://localhost:3000/api/";
const user = localStorage.getItem("user");

const getOneUser = (userId, config) => {
  return axios.get(API_URL + "auth/" + userId, config);
};

const getAllPosts = (config) => {
  return axios.get(API_URL + "posts", config);
};

const postOnePost = (postData) => {
  const options = {
    method: "post",
    url: API_URL + "posts",
    headers: {
      Authorization: "Bearer " + user,
      "content-type": "multipart/form-data",
    },
    data: postData,
  };
  // console.log(options);
  return axios(options);
};

const deleteOnePost = (postId, config) => {
  return axios.delete(API_URL + "posts/" + postId, config);
};
const updatePost = (postId, postData) => {
  const options = {
    method: "put",
    url: API_URL + "posts" + postId,
    headers: {
      Authorization: "Bearer " + user,
      "content-type": "multipart/form-data",
    },
    data: postData,
  };

  return axios(options);
};

const addLikes = (postId, choice, config) => {
  axios.post(API_URL + `posts/${postId}/like`, config);
};

export default {
  getOneUser,
  getAllPosts,
  postOnePost,
  deleteOnePost,
  updatePost,
  addLikes,
};
