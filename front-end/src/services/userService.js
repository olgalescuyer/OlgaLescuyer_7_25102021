import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const getOneUser = (userId, config) => {
  return axios.get(API_URL + "auth/" + userId, config);
};

const modifyUser = (userId, data, token) => {
  const options = {
    method: "put",
    url: API_URL + "auth/" + userId,
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  return axios(options);
};

const updateUserPass = (userId, data, token) => {
  const options = {
    method: "put",
    url: API_URL + "auth/" + userId + "/pass",
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  return axios(options);
};

const deleteUser = (userId, config) => {
  return axios.delete(API_URL + "auth/" + userId, config);
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

  return axios(options);
};

const getOnePost = (postId, config) => {
  return axios.get(API_URL + "posts/" + postId, config);
};

const deleteOnePost = (postId, config) => {
  return axios.delete(API_URL + "posts/" + postId, config);
};

const updatePost = (postId, data, token) => {
  const options = {
    method: "put",
    url: API_URL + "posts/" + postId,
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  return axios(options);
};

const addLike = (token, dataId, like) => {
  const options = {
    method: "post",
    url: API_URL + `posts/${dataId.postId}/like`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { like: like },
  };

  return axios(options);
};

const updateLike = (token, data, like) => {
  const options = {
    method: "put",
    url: API_URL + `posts/${data.postId}/like`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { likeId: data.likeId, userId: data.userId, like: like },
  };

  return axios(options);
};

export default {
  getOneUser,
  modifyUser,
  updateUserPass,
  deleteUser,
  getOnePost,
  getAllPosts,
  postOnePost,
  deleteOnePost,
  updatePost,
  addLike,
  updateLike,
};
