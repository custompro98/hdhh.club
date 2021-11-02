import { Suggestion, del } from "./suggestion"
import { getter, setter } from "../firebase/database"

const path = `upNext`

const get = getter(path)
const set = setter(path)

const find = async (): Promise<Suggestion> => {
  try {
    const result = await get() as Suggestion

    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

const schedule = async (suggestion: Suggestion): Promise<boolean> => {
  try {
    await set(suggestion)
    await del(suggestion.key)

    return true
  } catch (e) {
    return Promise.reject(e)
  }
}


export { find, schedule }
