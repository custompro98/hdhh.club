import { writer } from "../firebase/database"

const path = "suggestions"
const write = writer(path)

export type Suggestion = {
  name: string
}

const submit = async (suggestion: Suggestion): Promise<string> => {
  const normalizedSuggestion = normalize(suggestion)

  try {
    const result = await write(normalizedSuggestion)
    return result
  } catch (e) {
    console.log(JSON.stringify(e))
    return Promise.reject(e)
  }
}

const normalize = (suggestion: Suggestion) => {
  return { ...suggestion, name: suggestion.name.toLowerCase() }
}

export { submit }
