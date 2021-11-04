import { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Layout from "../components/layout"
import { AuthContext, useAuth } from "../components/auth"

import { NOT_FOUND } from "../lib/http"
import { Suggestion } from "../lib/models/suggestion"

import styles from "../styles/random.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Random() {
  const { user } = useAuth() as AuthContext
  const [choice, setChoice] = useState({} as Suggestion)
  const [loading, setLoading] = useState(false)
  const [noneFound, setNoneFound] = useState(false)

  useEffect(() => {
    if (!user) { return }

    async function doRequest() {
      const response = await fetch("/api/get-suggestion", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      })

      const result = (await response.json()) as Suggestion

      if (response.status !== NOT_FOUND) {
        setNoneFound(false)
        setChoice(result)
      } else {
        setNoneFound(true)
        setChoice({} as Suggestion)
      }
    }

    doRequest()
  }, [user])

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
            <>
              <span className={styles.choice}>☹️ No suggestions found</span>
              <Link href="/submit">
                <a>Suggest</a>
              </Link>
            </>
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
              <div className={styles.buttonContainer}>
                <span className={styles.button} onClick={randomize}>👎</span>
                <span className={styles.button} onClick={select}>👍</span>
              </div>
            </>
          ) : null}
          <ToastContainer position="top-right" closeOnClick />
        </div>
      ) : null
      }
    </Layout >
  )
}
