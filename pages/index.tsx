import Link from "next/link"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home() {
  const { user } = useAuth() as AuthContext;

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          <Link href="/submit">
            <a className={utilStyles.headingLg}>Submit an idea</a>
          </Link>
        </div>
      ) : null}
    </Layout>
  )
}
