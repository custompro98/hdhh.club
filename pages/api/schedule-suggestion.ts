import { NextApiRequest, NextApiResponse } from "next"

import { withAuth } from "../../lib/middleware/with-auth"
import { schedule } from "../../lib/models/up-next"
import { CREATED, INTERNAL_SERVER_ERROR } from "../../lib/http"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await schedule(req.body.suggestion)

    res.status(CREATED).json({ id: result })
  } catch (e) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An internal server error occurred" })
  }
}

export default withAuth(handler)
