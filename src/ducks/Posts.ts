import { Dispatch, AnyAction } from 'redux';
import { IServices } from '../services';
import { firestore } from 'firebase';

import downloadImage from '../utils/downloadImage';

const START = 'post/fetch-start';
const SUCCESS = 'post/fetch-success';
const ERROR = 'post/fetch-error';
const ADD = 'post/add';

export interface IPost {
  comment: string;
  userId: string;
  createdAt: firestore.Timestamp;
  imageURL: string;
}
export interface IDataPosts {
  [key: string]: IPost;
}

const fetchStart = () => ({
  type: START
});

const fetchSuccess = (payload: IDataPosts) => ({
  type: SUCCESS,
  payload
});

const fetchError = (error: Error) => ({
  type: ERROR,
  error
});

const add = (payload: IDataPosts) => ({
  type: ADD,
  payload
});

const initialState = {
  data: {},
  fetching: false,
  fetched: false
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case START:
      return {
        ...state,
        fetching: true
      };

    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetched: true,
        fetching: false
      };

    case ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      };

    case ADD:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

export const fetchPosts = () => {
  return async (dispatch: Dispatch, getState: () => any, { db, storage }: IServices) => {
    dispatch(fetchStart());

    try {
      const snaps = await db.collection('posts').get();
      const posts: any = {};

      snaps.forEach((snap) => (posts[snap.id] = snap.data()));

      const images = await Promise.all(
        Object.keys(posts).map(async (id) => {
          const ref = storage.ref(`posts/${id}.jpg`);
          const url = await ref.getDownloadURL();
          return [id, url];
        })
      );

      const imgsObject: any = {};

      images.forEach((img) => (imgsObject[img[0]] = img[1]));

      Object.keys(posts).forEach(
        (id) =>
          (posts[id] = {
            ...posts[id],
            imageURL: imgsObject[id]
          })
      );

      dispatch(fetchSuccess(posts));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

export const like = (id: string) => {
  return async (dispatch: Dispatch, getState: () => void, { auth }: IServices) => {
    if (!auth.currentUser) {
      return;
    }

    const token = await auth.currentUser.getIdToken();

    await fetch(`/api/posts/${id}/like`, {
      headers: {
        authorization: token
      }
    });
  };
};

export const share = (id: string) => {
  return async (
    dispatch: Dispatch,
    getState: () => void,
    { auth, db, storage }: IServices
  ) => {
    if (!auth.currentUser) {
      return;
    }

    const token = await auth.currentUser.getIdToken();

    const result = await fetch(`/api/posts/${id}/share`, {
      headers: {
        authorization: token
      }
    });

    const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL();
    const blob = await downloadImage(url);

    const { id: postId } = await result.json();

    const ref = storage.ref(`posts/${postId}.jpg`);
    await ref.put(blob);

    const imageURL = await ref.getDownloadURL();

    const snap = await db.collection('posts').doc(postId).get();

    dispatch(
      add({
        [snap.id]: {
          ...snap.data(),
          imageURL
        }
      } as IDataPosts)
    );
  };
};
