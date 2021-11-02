import {
  reader,
  remover,
  writer
} from "../firebase/database"

const path = "suggestions"
const read = reader(path)
const remove = remover(path)
const write = writer(path)

export type Suggestion = {
  key?: string // key is only populated after save
  name: string
}

const ALREADY_EXISTS = "already exists"

const del = async (key: string): Promise<boolean> => {
  try {
    await remove(key)

    return true
  } catch (e) {
    return Promise.reject(e)
  }
}

const randomize = async (): Promise<Suggestion> => {
  try {
    const allSuggestions = (await read()) as Suggestion[]
    const numSuggestions = allSuggestions.length

    return allSuggestions[randomNumber(numSuggestions)]
  } catch (e) {
    return Promise.reject(e)
  }
}

const submit = async (suggestion: Suggestion): Promise<Suggestion> => {
  const normalizedSuggestion = normalize(suggestion)

  try {
    if (await alreadyExists(normalizedSuggestion)) {
      return Promise.reject(ALREADY_EXISTS)
    }

    const key = await write(normalizedSuggestion)

    return { key, ...suggestion }
  } catch (e) {
    return Promise.reject(e)
  }
}

const alreadyExists = async (entry: Suggestion): Promise<boolean> => {
  const allSuggestions = await read()

  for (let suggestion of allSuggestions as Suggestion[]) {
    if (suggestion.name === entry.name) {
      return true
    }
  }

  return false
}

const normalize = (suggestion: Suggestion) => {
  return { ...suggestion, name: suggestion.name.toLowerCase() }
}

const randomNumber = (max: number): number => {
  return Math.floor(Math.random() * max)
}

export { ALREADY_EXISTS, del, randomize, submit }
