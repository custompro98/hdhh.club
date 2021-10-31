import { SyntheticEvent } from "react"

import { AuthUser } from "./auth"

import styles from "./input.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Input({ user }: { user: AuthUser }) {
  const suggest = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      idea: { value: string }
    }

    await fetch("/api/submit-form", {
      body: JSON.stringify({
        idea: target.idea.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "POST",
    })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={suggest}>
        <div className={styles.container}>
          <label htmlFor="idea" className={utilStyles.headingLg}>
            Idea
          </label>
        </div>
        <div className={styles.container}>
          <input id="idea" type="text" required className={styles.element} />
        </div>
        <div className={styles.container}>
          <button type="submit">Suggest</button>
        </div>
      </form>
    </div>
  )
}
