import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect
} from "firebase/auth";

import firebase from "./client"

const auth = getAuth(firebase)
const provider = new GoogleAuthProvider()

export default async (): Promise<string> => {
  await signInWithRedirect(auth, provider)

  try {
    const result = await getRedirectResult(auth)
    const credential = GoogleAuthProvider.credentialFromResult(result)

    const token = credential.accessToken

    console.log(token)

    return token
  } catch (e) {
    const credential = GoogleAuthProvider.credentialFromError(e);

    console.log(JSON.stringify(e))
    console.log(JSON.stringify(credential))

    return ""
  }
}
