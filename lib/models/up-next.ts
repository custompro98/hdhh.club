import { Suggestion, del } from "./suggestion"
import { setter } from "../firebase/database"

const path = `upNext`

const set = setter(path)

const schedule = async (suggestion: Suggestion): Promise<boolean> => {
  try {
    await set(suggestion)
    await del(suggestion.key)

    return true
  } catch (e) {
    return Promise.reject(e)
  }
}


export { schedule }
