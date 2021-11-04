import Link from "next/link"
import { GetServerSideProps } from "next"
import cn from "classnames"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import { Suggestion } from "../lib/models/suggestion"
import { find } from "../lib/models/up-next"

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home({ upNext }: { upNext: Suggestion }) {
  const { user } = useAuth() as AuthContext

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          {upNext.name ? (
            <span className={cn(utilStyles.headingXl, styles.upNext)}>{upNext.name}</span>
          ) : null}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await find()

  return {
    props: {
      upNext: JSON.parse(JSON.stringify(result))
    }
  }
}
