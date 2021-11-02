import { NextApiRequest, NextApiResponse } from "next"

import { withAuth } from "../../lib/middleware/with-auth"
import { del } from "../../lib/models/suggestion"
import { INTERNAL_SERVER_ERROR, OK } from "../../lib/http"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await del(req.body.suggestion.key)

    res.status(OK).json({ success: result })
  } catch (e) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "An internal server error occurred" })
  }
}

export default withAuth(handler)
