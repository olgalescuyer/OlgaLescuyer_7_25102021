import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const getOneUser = (userId, config) => {
  // console.log(config);
  return axios.get(API_URL + "auth/" + userId, config);
};

const getAllPosts = (config) => {
  return axios.get(API_URL + "posts", config);
};

const postOnePost = (postData, token) => {
  const options = {
    method: "post",
    url: API_URL + "posts",
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
    data: postData,
  };
  // console.log("post : ", options);
  return axios(options);
};

const getOnePost = (postId, config) => {
  return axios.get(API_URL + "posts/" + postId, config);
};

const deleteOnePost = (postId, config) => {
  return axios.delete(API_URL + "posts/" + postId, config);
};

const updatePost = (postId, postData, token) => {
  const options = {
    method: "put",
    url: API_URL + "posts" + postId,
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
    data: postData,
  };

  return axios(options);
};

const addLikes = (token, postId, like) => {
  const options = {
    method: "post",
    url: API_URL + `posts/${postId}/like`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { like: like },
  };
  // console.log(options);
  return axios(options);
};

export default {
  getOneUser,
  getOnePost,
  getAllPosts,
  postOnePost,
  deleteOnePost,
  updatePost,
  addLikes,
};
