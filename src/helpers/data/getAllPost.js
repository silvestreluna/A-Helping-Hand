import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const firebaseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getAllPost = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/post.json`)
    .then((resp) => {
      const allPost = resp.data;
      const postWithId = [];
      Object.keys(allPost).forEach((post) => {
        allPost[post].id = post;
        postWithId.push(allPost[post]);
      });
      resolve(postWithId);
    })
    .catch(err => reject(err));
});

const getItemProdById = postId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/items.json?orderBy="postId"&equalTo="${postId}"`)
    .then((resp) => {
      const allData = resp.data;
      const dataWithId = [];
      Object.keys(allData).forEach((post) => {
        allData[post].id = post;
        dataWithId.push(allData[post]);
      });
      // console.error(dataWithId);
      resolve(dataWithId);
    })
    .catch(err => reject(err));
});


const getUser = uid => axios.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`);
const getHelperByPostId = postId => axios.get(`${firebaseUrl}/helpers.json?orderBy="postId"&equalTo="${postId}"`);


const addNewPost = (newPost, postKey) => axios.put(`${firebaseUrl}/post/${postKey}.json`, newPost);
const addHelper = helperObj => axios.post(`${firebaseUrl}/helpers.json`, helperObj);

const editPost = (postObj, postId) => axios.patch(`${firebaseUrl}/post/${postId}.json`, postObj);

const editStuff = (postObj, postId, path) => axios.patch(`${firebaseUrl}/${path}/${postId}.json`, postObj);

const getDonorSelectedItem = (postId, path) => axios.get(`${firebaseUrl}/${path}/${postId}.json`);

const editDeleteItem = itemId => postId => axios.delete(`${firebaseUrl}/items/${itemId}.json`);

const editDeleteProd = prodId => postId => axios.delete(`${firebaseUrl}/products/${prodId}.json`);


const getDataById = stuffId => axios.get(`${firebaseUrl}/post/${stuffId}.json`);

const getAllProd = () => axios.get(`${firebaseUrl}/products.json`);


const addNewProd = (newProd, prodId) => axios.put(`${firebaseUrl}/products/${prodId}.json`, newProd);

const addNewItem = newItem => axios.post(`${firebaseUrl}/items.json`, newItem);

const deleteMyPost = postId => axios.delete(`${firebaseUrl}/post/${postId}.json`);

const getHelperCountByUid = uid => axios.get(`${firebaseUrl}/helpers.json?orderBy="donorUid"&equalTo="${uid}"`);


export default {
  getAllPost,
  addNewPost,
  addNewProd,
  addNewItem,
  deleteMyPost,
  getDataById,
  editPost,
  editStuff,
  editDeleteItem,
  editDeleteProd,
  getDonorSelectedItem,
  getItemProdById,
  getUser,
  getAllProd,
  getHelperCountByUid,
  addHelper,
  getHelperByPostId,
};
