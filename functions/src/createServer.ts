import * as express from 'express';
import * as admin from 'firebase-admin';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      uid: string;
      email: string;
      role: string;
    };
  }
}

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();
const auth = admin.auth();

const createServer = () => {
  const app = express();

  app.use(async (req, res, next) => {
    const token = req.headers.authorization || '';

    try {
      const { uid, email } = await auth.verifyIdToken(token);

      const snap = await db.collection('/users').doc(uid).get();
      const user = snap.data();

      Object.assign(req, {
        user: {
          ...user,
          uid,
          email
        }
      });

      next();
    } catch (error) {
      res.status(403).send('Error al autorizar');
    }
  });

  app.get('/api/posts/:postId/like', async (req, res) => {
    const { uid } = req.user;
    const { postId } = req.params;

    const snaps = await db
      .collection('likes')
      .where('userId', '==', uid)
      .where('postId', '==', postId)
      .limit(1)
      .get();

    const result: { id?: string } = {};

    snaps.forEach((snap) =>
      Object.assign(result, {
        ...snap.data(),
        id: snap.id
      })
    );

    if (result.id) {
      await db.collection('likes').doc(result.id).delete();
    }

    if (!result.id) {
      await db.collection('likes').doc().set({
        userId: uid,
        postId,
        createdAt: new Date()
      });
    }

    res.sendStatus(204);
  });

  app.get('/api/posts/:postId/share', async (req, res) => {
    const { uid } = req.user;
    const { postId } = req.params;

    const snap = await db.collection('posts').doc(postId).get();
    const post = snap.data();

    const result = await db.collection('posts').add({
      ...post,
      userId: uid
    });

    res.send({ id: result.id });
  });

  return app;
};

export default createServer;
