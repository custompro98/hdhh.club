import Head from "next/head"
import Image from "next/image"

import { AuthContext, useAuth } from "../components/auth"

import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  const { loading, signinWithGoogle, signout, user } = useAuth() as AuthContext;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Organize and randomize hump day happy hour"
        />
        <title>HDHH</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.headerContainer}>
          <div className={styles.headerTxt}>
            <h1 className={utilStyles.headingLg}>Hump Day Happy Hour</h1>
          </div>
          <div className={styles.headerImg}>
            <Image
              priority
              src="/images/camel.svg"
              height={144}
              width={144}
              alt="camel"
            />
          </div>
          <div className={styles.headerAuth}>
            {user ? (
              <div className={styles.headerUserDetails}>
                <Image
                  priority
                  src={user.photoUrl}
                  className={utilStyles.borderCircle}
                  height={48}
                  width={48}
                  alt={user.name}
                />
                <div className={styles.headerAuthAction}>
                  <span className={utilStyles.lightText}>{user.name}</span>
                  <small>
                    <a href="#" onClick={signout}>Sign Out</a>
                  </small>
                </div>
              </div>
            ) : (
              <small>
                <a href="#" onClick={signinWithGoogle}>Sign In</a>
              </small>
            )}
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}
