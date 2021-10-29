import { Database } from 'firebase-admin/lib/database/database'
import {
  push,
  ref
} from 'firebase/database'

import admin from "./admin"

const database = admin.database() as Database

const writer = (path: string) => async (value: unknown): Promise<string> => {
  const dbRef = await push(ref(database, path), value)

  return dbRef.key
}

export { writer }
