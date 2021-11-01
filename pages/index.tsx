import Link from "next/link"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home() {
  const { user } = useAuth() as AuthContext

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          <Link href="/submit">
            <a className={utilStyles.headingLg}>Suggest</a>
          </Link>
          <Link href="/random">
            <a className={utilStyles.headingLg}>Choose</a>
          </Link>
        </div>
      ) : null}
    </Layout>
  )
}
