import { NextApiRequest, NextApiResponse } from "next"

import { withAuth } from "../../lib/middleware/with-auth"
import { randomize } from "../../lib/models/suggestion"
import { INTERNAL_SERVER_ERROR, OK } from "../../lib/http"

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await randomize()

    res.status(OK).json(result)
  } catch (e) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An internal server error occurred" })
  }
}

export default withAuth(handler)
