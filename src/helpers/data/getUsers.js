import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const firebaseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json`)
    .then((resp) => {
      const allUsers = resp.data;
      const usersWithId = [];
      Object.keys(allUsers).forEach((user) => {
        allUsers[user].id = user;
        usersWithId.push(allUsers[user]);
      });
      // console.error(usersWithId, 'user with id');
      resolve(usersWithId);
    })
    .catch(err => reject(err));
});

export default { getUsers };
