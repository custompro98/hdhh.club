import { NextApiRequest, NextApiResponse } from 'next'
import { withAuth } from '../../lib/middleware/with-auth'

import { submit } from "../../lib/models/suggestion"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)

  try {
    const result = await submit({
      name: req.body.idea
    })

    res.status(200).json({ id: result })
  } catch (e) {
    console.log(JSON.stringify(e))
    res.status(500).json({ error: "An internal server error occurred" })
  }
}

export default withAuth(handler)
