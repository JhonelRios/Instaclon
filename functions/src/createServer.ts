import * as express from 'express';
import * as admin from 'firebase-admin';

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

      console.log('yei')
      next();
    } catch (error) {
      res.status(403).send('Error al autorizar');
    }
  });

  app.get('/posts', (req, res) => {
    res.send('Hola mundo');
  });

  return app;
};

export default createServer;
