import Layout from "../components/layout"
import Input from "../components/input"

import { AuthContext, useAuth } from "../components/auth"

import styles from "../styles/submit.module.css"

export default function Submit() {
  const { user } = useAuth() as AuthContext;

  return (
    <Layout>
      {user ? (
        <div className={styles.container}>
          <Input user={user} />
        </div>
      ) : null}
    </Layout>
  )
}
