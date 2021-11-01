import { SyntheticEvent, useState } from "react"
import Image from "next/image"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import { Suggestion } from "../lib/models/suggestion"

import styles from "../styles/random.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Random() {
  const { user } = useAuth() as AuthContext
  const [choice, setChoice] = useState({} as Suggestion)
  const [loading, setLoading] = useState(false)

  const choose = async (event: SyntheticEvent) => {
    event.preventDefault()
    setLoading(true)

    const response = await fetch("/api/random-suggestion", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
    })

    const result = (await response.json()) as Suggestion

    setTimeout(() => {
      setChoice(result)
      setLoading(false)
    }, 750)
  }

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          {loading ? (
            <Image
              priority
              src="/images/loading.svg"
              height={80}
              width={80}
              alt="loading"
            />
          ) : (
            <span className={utilStyles.headingMd}>{choice.name}</span>
          )}
          <form onSubmit={choose}>
            <div className={styles.container}>
              <button type="submit" disabled={loading}>
                {choice.key ? "Choose again" : "Choose"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </Layout>
  )
}
