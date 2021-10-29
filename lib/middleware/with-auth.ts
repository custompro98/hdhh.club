import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextApiRequest, NextApiResponse } from 'next'

import admin from '../firebase/admin';

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end('Not authenticated. No Auth header');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: DecodedIdToken
    try {
      decodedToken = await admin.auth().verifyIdToken(token);

      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end('Not authenticated');

      req.body.uid = decodedToken.uid;
    } catch (error) {
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;

      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
}
