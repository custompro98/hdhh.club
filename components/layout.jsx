import Head from "next/head"
import Image from "next/image"

import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Organize and randomize hump day happy hour"
        />
        <title>HDHH</title>
      </Head>
      <header className={styles.header}>
        <Image
          priority
          src="/images/camel.svg"
          height={144}
          width={144}
          alt="camel"
        />
        <h1 className={utilStyles.heading2Xl}>Hump Day Happy Hour</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}
