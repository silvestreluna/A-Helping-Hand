import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const firebaseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getItems = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/items.json`)
    .then((resp) => {
      const allItems = resp.data;
      const itemWithId = [];
      Object.keys(allItems).forEach((item) => {
        allItems[item].id = item;
        itemWithId.push(allItems[item]);
      });
      // console.error(itemWithId, 'item with id');
      resolve(itemWithId);
    })
    .catch(err => reject(err));
});

export default { getItems };
