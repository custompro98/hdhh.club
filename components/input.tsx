import { SyntheticEvent } from "react"

import { AuthUser } from "./auth"

import { submit } from "../lib/models/suggestion"

import styles from "./input.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Input({ user }: { user: AuthUser }) {
  const submitIdea = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      idea: { value: string }
    }

    await fetch(
      '/api/submit-form',
      {
        body: JSON.stringify({
          idea: target.idea.value
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        method: 'POST'
      }
    )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitIdea}>
        <div className={styles.container}>
          <label htmlFor="idea" className={utilStyles.headingLg}>Idea</label>
        </div>
        <div className={styles.container}>
          <input id="idea" type="text" required className={styles.element} />
        </div>
        <div className={styles.container}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
