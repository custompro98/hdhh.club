import { SyntheticEvent } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthUser } from "./auth"

import {
  CREATED,
  DUPLICATE
} from "../lib/http"

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
      idea: { value: string }
    }

    const idea = target.idea.value

    const result = await fetch("/api/submit-form", {
      body: JSON.stringify({
        idea,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "POST",
    })

    if (result.status === CREATED) {
      toast.success(`Thanks for suggesting ${idea}!`)
    } else if (result.status === DUPLICATE) {
      toast.warn(`${idea} is already on the list, thanks!`)
    } else {
      toast.error(`Something's broken, try again later.`)
    }

    form.reset()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={suggest} ref={setForm}>
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
      <ToastContainer
        position="bottom-center"
        closeOnClick
      />
    </div>
  )
}
