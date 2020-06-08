import * as firebase from './firebase';
import { auth, firestore, storage } from 'firebase';

const services = {
  ...firebase
};

export interface IServices {
  auth: auth.Auth;
  db: firestore.Firestore;
  storage: storage.Storage;
}

export default services;
