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

const addNewPost = (newPost, postKey) => axios.put(`${firebaseUrl}/post/${postKey}.json`, newPost);


const addNewProd = (newProd, prodId) => axios.put(`${firebaseUrl}/products/${prodId}.json`, newProd);

const addNewItem = newItem => axios.post(`${firebaseUrl}/items.json`, newItem);

const deleteMyPost = postId => axios.delete(`${firebaseUrl}/post/${postId}.json`);


export default {
  getAllPost,
  addNewPost,
  addNewProd,
  addNewItem,
  deleteMyPost,
};
