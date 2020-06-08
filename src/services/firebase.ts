import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDdMk21Btx8Hbujm_D1sDP4QWot6vS_s0A',
  authDomain: 'instaclon-96907.firebaseapp.com',
  databaseURL: 'https://instaclon-96907.firebaseio.com',
  projectId: 'instaclon-96907',
  storageBucket: 'instaclon-96907.appspot.com',
  messagingSenderId: '208097274298',
  appId: '1:208097274298:web:230e3a87119fb3282ed583',
  measurementId: 'G-H43W45C7BC'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
