import Layout from "../components/layout"
import Input from "../components/input"

import styles from "../styles/Home.module.css"
import utilStyles from "../styles/utils.module.css"

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Input />
      </div>
    </Layout>
  ) 
}
