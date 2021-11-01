import admin from "./admin"

type FirebaseEntries = {
  [key: string]: Object
}

const database = admin.database()

const reader = (path: string) => async (): Promise<unknown> => {
  const entries = await database.ref(path).get()
  const result = normalize(entries.val() as FirebaseEntries)

  return result
}

const writer =
  (path: string) =>
  async (value: unknown): Promise<string> => {
    const result = await database.ref(path).push(value)

    return result.key
  }

const normalize = (entries: FirebaseEntries): Object[] => {
  const result = []

  const keys = Object.keys(entries)

  for (let key of keys) {
    result.push(Object.assign({}, { key, ...entries[key] }))
  }

  return result
}

export { reader, writer }
