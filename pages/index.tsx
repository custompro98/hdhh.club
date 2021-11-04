import { useEffect, useState } from "react"
import Link from "next/link"
import { GetServerSideProps } from "next"
import cn from "classnames"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import { Suggestion } from "../lib/models/suggestion"

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home() {
  const { user } = useAuth() as AuthContext
  const [upNext, setUpNext] = useState({} as Suggestion)

  useEffect(() => {
    if (!user) { return }

    async function doRequest() {
      const response = await fetch("/api/get-scheduled", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      })

      const result = (await response.json()).suggestion as Suggestion

      setUpNext(result)
    }

    doRequest()
  }, [user])

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
