import { Dispatch, AnyAction } from 'redux';
import { IServices } from '../services';

const SET_PROFILE_IMAGE = 'user/set-profile-image';

export const setProfileImage = (payload: string) => ({
  type: SET_PROFILE_IMAGE,
  payload
});
export interface ILogin {
  email: string;
  password: string;
}

export default function reducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload
      };

    default:
      return state;
  }

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

export const loadUserInitialData = () => {
  return async (dispatch: Dispatch, getState: () => any, { auth, storage }: IServices) => {
    if (!auth.currentUser) {
      return
    }

    const ref = storage.ref();
    const { uid } = auth.currentUser;
    
    const imageRef = ref.child('profileImages').child(`${uid}.jpg`);
    const url = await imageRef.getDownloadURL();

    dispatch(setProfileImage(url));
  }
}

export const handleProfileImgSubmit = (payload: { profileImg: File }) => {
  return async (dispatch: Dispatch, getState: () => void, { auth, storage }: IServices) => {
    if (!auth.currentUser) {
      return;
    }

    const { uid } = auth.currentUser;
    const ref = storage.ref();

    const response = await ref.child('profileImages').child(`${uid}.jpg`).put(payload.profileImg);
    const url = await response.ref.getDownloadURL();

    console.log(url);

    dispatch(setProfileImage(url));
  };
};
