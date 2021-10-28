import Layout from "../components/layout"
import Input from "../components/input"

import styles from "../styles/submit.module.css"

export default function Submit() {
  return (
    <Layout>
      <div className={styles.container}>
        <Input />
      </div>
    </Layout>
  )
}
