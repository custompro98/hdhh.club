import {
  getDatabase,
  push,
  ref
} from 'firebase/database'

import firebase from './client'

const database = getDatabase(firebase)

const writer = (path: string) => async (value: unknown): Promise<string> => {
  const dbRef = await push(ref(database, path), value)

  return dbRef.key
}

export { writer }
