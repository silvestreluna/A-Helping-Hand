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
      // console.error(postWithId, 'post with id');
      resolve(postWithId);
    })
    .catch(err => reject(err));
});

export default { getAllPost };
