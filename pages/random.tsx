import { SyntheticEvent, useState } from "react"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import { Suggestion } from "../lib/models/suggestion"

import styles from "../styles/random.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Random() {
  const { user } = useAuth() as AuthContext
  const [choice, setChoice] = useState({} as Suggestion)

  const choose = async (event: SyntheticEvent) => {
    event.preventDefault()

    const response = await fetch("/api/random-suggestion", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
    })

    const result = (await response.json()) as Suggestion

    setChoice(result)
  }

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          <span className={utilStyles.headingMd}>
            {choice.key ? choice.name : "Feeling lucky?"}
          </span>
          <form onSubmit={choose}>
            <div className={styles.container}>
              <button type="submit">
                {choice.key ? "Choose again" : "Choose"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </Layout>
  )
}
