import { SyntheticEvent } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { AuthUser } from "./auth"
import { CREATED, DUPLICATE } from "../lib/http"

import styles from "./input.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Input({ user }: { user: AuthUser }) {
  let form: HTMLFormElement

  const setForm = (el: HTMLFormElement) => {
    form = el
  }

  const suggest = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      suggestion: { value: string }
    }

    const suggestion = target.suggestion.value

    const result = await fetch("/api/create-suggestion", {
      body: JSON.stringify({
        suggestion,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "POST",
    })

    if (result.status === CREATED) {
      toast.success(`Thanks for suggesting ${suggestion}!`)
    } else if (result.status === DUPLICATE) {
      toast.warn(`${suggestion} is already on the list, thanks!`)
    } else {
      toast.error(`Something's broken, try again later.`)
    }

    form.reset()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={suggest} ref={setForm}>
        <div className={styles.container}>
          <label htmlFor="suggestion" className={utilStyles.headingLg}>
            Suggestion
          </label>
        </div>
        <div className={styles.container}>
          <input id="suggestion" type="text" required className={styles.element} />
        </div>
        <div className={styles.container}>
          <button type="submit">Suggest</button>
        </div>
      </form>
      <ToastContainer position="bottom-center" closeOnClick />
    </div>
  )
}
