import { NextApiRequest, NextApiResponse } from "next"

import { withAuth } from "../../lib/middleware/with-auth"
import { find } from "../../lib/models/up-next"
import { INTERNAL_SERVER_ERROR, OK } from "../../lib/http"

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await find()

    res.status(OK).json({ suggestion: result })
  } catch (e) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An internal server error occurred" })
  }
}

export default withAuth(handler)
