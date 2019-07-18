import axios from 'axios';
import firebaseKeys from '../apiKeys.json';

const firebaseUrl = firebaseKeys.firebaseKeys.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/products.json`)
    .then((resp) => {
      const allProd = resp.data;
      const prodWithId = [];
      Object.keys(allProd).forEach((prod) => {
        allProd[prod].id = prod;
        prodWithId.push(allProd[prod]);
      });
      // console.error(prodWithId, 'prod with id');
      resolve(prodWithId);
    })
    .catch(err => reject(err));
});

export default { getProducts };
