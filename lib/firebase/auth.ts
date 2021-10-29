import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  User
} from "firebase/auth";

import firebase from "./client"

const auth = getAuth(firebase)
const provider = new GoogleAuthProvider()

export default async (): Promise<User> => {
  await signInWithRedirect(auth, provider)

  try {
    const { user } = await getRedirectResult(auth)

    return user
  } catch (e) {
    const credential = GoogleAuthProvider.credentialFromError(e);

    console.log(JSON.stringify(e))
    console.log(JSON.stringify(credential))

    Promise.reject(e)
  }
}
