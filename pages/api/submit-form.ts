import { NextApiRequest, NextApiResponse } from "next"

import { withAuth } from "../../lib/middleware/with-auth"
import { submit } from "../../lib/models/suggestion"
import {
  CREATED,
  DUPLICATE,
  INTERNAL_SERVER_ERROR
} from "../../lib/http"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await submit({
      name: req.body.idea,
    })

    res.status(CREATED).json({ id: result })
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "An internal server error occurred" })
  }
}

export default withAuth(handler)
