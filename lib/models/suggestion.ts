import { writer } from "../firebase/database"

const path = "suggestions"
const write = writer(path)

export type Suggestion = {
  name: string
}

const submit = async (suggestion: Suggestion): Promise<string> => {
  try {
    const result = await write(suggestion)
    return result
  } catch (e) {
    console.log(JSON.stringify(e))
    return Promise.reject(e)
  }
}

export { submit }
