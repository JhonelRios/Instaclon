import { Dispatch, AnyAction } from 'redux';
import { IServices } from '../services';
import { firestore } from 'firebase';

const START = 'post/fetch-start';
const SUCCESS = 'post/fetch-success';
const ERROR = 'post/fetch-error';

export interface IDataPosts {
  [key: string]: {
    comment: string;
    userId: string;
    createdAt: firestore.Timestamp;
    imageURL: string;
  };
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
  return async (dispatch: Dispatch, getState: () => void, {}: IServices) => {
    console.log(id);
    console.log(
      await fetch('/api/posts')
    );
  };
};

export const share = (id: string) => {
  return async (dispatch: Dispatch, getState: () => void, {}: IServices) => {
    console.log(id);
  };
};
