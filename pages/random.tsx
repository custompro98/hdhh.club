import { SyntheticEvent, useState } from "react"
import Image from "next/image"
import { GetServerSideProps } from "next"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import { NOT_FOUND } from "../lib/http"
import { NONE_FOUND, randomize, Suggestion } from "../lib/models/suggestion"

import styles from "../styles/random.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Random({ suggestion, anyFound }: { suggestion: Suggestion, anyFound: boolean }) {
  const { user } = useAuth() as AuthContext
  const [choice, setChoice] = useState(suggestion as Suggestion)
  const [loading, setLoading] = useState(false)
  const [noneFound, setNoneFound] = useState(!anyFound)

  const randomize = async (event: SyntheticEvent) => {
    event.preventDefault()
    setLoading(true)

    const response = await fetch("/api/get-suggestion", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
    })

    const result = (await response.json()) as Suggestion

    setTimeout(() => {
      if (response.status !== NOT_FOUND) {
        setNoneFound(false)
        setChoice(result)
      } else {
        setNoneFound(true)
        setChoice({} as Suggestion)
      }

      setLoading(false)
    }, 750)
  }

  const select = async (event: SyntheticEvent) => {
    event.preventDefault()

    try {
      await fetch("/api/schedule-suggestion", {
        body: JSON.stringify({
          suggestion: choice
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        method: "POST",
      })

      toast.success(`Enjoy eating at ${choice.name}`)
    } catch (e) {
      toast.error("Something went wrong, enjoy anyway!")
    }
  }

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          {noneFound && !loading ? (
            <span className={styles.choice}>☹️ No suggestions found</span>
          ) : null}
          {loading ? (
            <Image
              priority
              src="/images/loading.svg"
              height={80}
              width={80}
              alt="loading"
            />
          ) : (
            <span className={styles.choice}>{choice.name}</span>
          )}
          {choice.key ? (
            <>
              <form onSubmit={randomize}>
                <div className={styles.container}>
                  <button type="submit" disabled={loading}>👎</button>
                </div>
              </form>
              <form onSubmit={select}>
                <div className={styles.container}>
                  <button type="submit" disabled={loading}>👍</button>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={randomize}>
              <div className={styles.container}>
                <button type="submit" disabled={loading}>
                  {choice.key ? "Choose again" : "Choose"}
                </button>
              </div>
            </form>
          )}
          <ToastContainer position="bottom-center" closeOnClick />
        </div>
      ) : null}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let result = {} as Suggestion
  let anyFound = true

  try {
    result = await randomize()
  } catch (e) {
    if (e === NONE_FOUND) {
      anyFound = false
    }
  }

  return {
    props: {
      suggestion: JSON.parse(JSON.stringify(result)),
      anyFound,
    }
  }
}
