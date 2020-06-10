import { Dispatch } from 'redux';
import { IServices } from '../services';

export interface ILogin {
  email: string;
  password: string;
}

export default function reducer(state = {}) {
  return state;
}

export const login = (payload: ILogin) => {
  return async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
    const { email, password } = payload;
    await auth.signInWithEmailAndPassword(email, password);
  };
};

export const register = (payload: ILogin) => {
  return async (dispatch: Dispatch, getState: () => any, { auth, db }: IServices) => {
    const { email, password } = payload;
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    const doc = db.collection('users').doc(user?.uid);

    await doc.set({ role: 'user' });
  };
};
