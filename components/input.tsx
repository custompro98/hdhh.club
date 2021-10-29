import { SyntheticEvent } from "react"

import styles from "./input.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Input() {
  const submitIdea = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      idea: { value: string }
    }

    // alert(target.idea.value)
    const res = await fetch(
      '/api/submit-form',
      {
        body: JSON.stringify({
          idea: target.idea.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    const json = await res.json()

    if (json.error) {
      alert(json.error)
    } else {
      alert(json.id)
    }
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
