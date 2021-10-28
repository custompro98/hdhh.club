import Head from "next/head";
import Image from "next/image";

import Layout from "../components/layout";

import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={utilStyles.headingXl}>Coming soon...</h2>
      </div>
    </Layout>
  );
}
