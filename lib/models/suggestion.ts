import { reader, writer } from "../firebase/database"

const path = "suggestions"
const read = reader(path)
const write = writer(path)

export type Suggestion = {
  key?: string // key is only populated after save
  name: string
}

const ALREADY_EXISTS = "already exists"

const alreadyExists = async (entry: Suggestion): Promise<boolean> => {
  const allSuggestions = await read()

  for (let suggestion of allSuggestions as Suggestion[]) {
    if (suggestion.name === entry.name) {
      return true
    }
  }

  return false
}

const submit = async (suggestion: Suggestion): Promise<string> => {
  const normalizedSuggestion = normalize(suggestion)

  try {
    const exists = await alreadyExists(normalizedSuggestion)
    if (exists) {
      return Promise.reject(ALREADY_EXISTS)
    }

    // TODO: return the suggestion with a key in place
    const result = await write(normalizedSuggestion)
    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

const normalize = (suggestion: Suggestion) => {
  return { ...suggestion, name: suggestion.name.toLowerCase() }
}

export { ALREADY_EXISTS, submit }
