import Image from "next/image"
import Link from "next/link"

import Layout from "../components/layout"

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth"

// TODO: this exposes the API key in the browser 😠
import authenticate from "../lib/firebase/auth"
import firebase from "../lib/firebase/client";

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home() {
  const [user, loading, error] = useAuthState(getAuth(firebase));

  console.log(`Loading: ${loading} | Current User: ${JSON.stringify(user)}`)

  return (
    <Layout>
      {error ? (
        <p>Unable to log in: ${error}</p>
      ) : (
        <div className={styles.container}>
          {user ? (
            <>
              <Image
                src={user.photoURL}
                height="108"
                width="108"
                className={utilStyles.borderCircle}
              />
            </>
          ) : (
            <a href="#" className={utilStyles.headingLg} onClick={authenticate}>Login</a>
          )}
          <Link href="/submit">
            <a className={utilStyles.headingLg}>Submit an idea</a>
          </Link>
        </div>
      )}
    </Layout>
  )
}
