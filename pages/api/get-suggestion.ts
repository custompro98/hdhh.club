import { NextApiRequest, NextApiResponse } from "next"

import { withAuth } from "../../lib/middleware/with-auth"
import { NONE_FOUND, randomize } from "../../lib/models/suggestion"
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../lib/http"

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await randomize()

    res.status(OK).json(result)
  } catch (e) {
    if (e === NONE_FOUND) {
      res.status(NOT_FOUND).json({ error: "No suggestions found" })
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "An internal server error occurred" })
    }
  }
}

export default withAuth(handler)
