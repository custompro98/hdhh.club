import admin from "./admin"

type FirebaseEntries = {
  [key: string]: Object
}

const database = admin.database()

const exister = (path: string) => async (): Promise<boolean> => {
  let result: boolean
  await database.ref(path).once("value", res => {
    result = res.val() !== null
  })

  return result
}

const getter = (path: string) => async (key?: string): Promise<unknown> => {
  let ref = database.ref(path)

  if (key) {
    ref = ref.child(key)
  }

  const result = await ref.get()

  return result
}

const reader = (path: string) => async (): Promise<unknown[]> => {
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

const setter = (path: string) => async (value: unknown): Promise<void> => {
  await database.ref(path).set(value)
}

const writer = (path: string) => async (value: unknown): Promise<string> => {
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

export { exister, getter, remover, reader, setter, writer }
