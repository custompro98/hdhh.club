import admin from "./admin"

const database = admin.database()

const writer = (path: string) => async (value: unknown): Promise<string> => {
  const dbRef = await database.ref(path).push(value)

  return dbRef.key
}

export { writer }
