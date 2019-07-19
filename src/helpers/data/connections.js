import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys.json';

const fbConnection = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
  }
};

export default fbConnection;
