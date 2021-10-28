import Layout from "../components/layout"
import Link from "next/link"

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Link href="/submit">
          <a className={utilStyles.headingLg}>Submit an idea</a>
        </Link>
      </div>
    </Layout>
  )
}
