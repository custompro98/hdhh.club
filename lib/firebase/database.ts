import admin from "./admin"

type FirebaseEntries = {
  [key: string]: Object
}

const database = admin.database()

const exister = (path: string) => async (): Promise<boolean> => {
  let result: boolean
  database.ref(path).once("value", res => {
    result = res.val() !== null
  })

  return result
}

const reader = (path: string) => async (): Promise<unknown> => {
  const entries = await database.ref(path).get()
  const result = normalize(entries.val() as FirebaseEntries)

  return result
}

const remover = (path: string) => async (key: string): Promise<void> => {
  try {
    await database.ref(path).child(key).remove()
  } catch (e) {
    Promise.reject(e)
  }
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

export { exister, remover, reader, writer }
