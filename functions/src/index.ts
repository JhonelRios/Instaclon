import * as functions from 'firebase-functions';
import createServer from './createServer';

export const api = functions.https.onRequest(createServer());
