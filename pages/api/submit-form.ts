import { NextApiRequest, NextApiResponse } from 'next'

import { submit } from "../../lib/models/suggestion"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)

  try {
    const result = await submit({
      name: req.body.idea
    })

    res.status(200).json({ id: result })
  } catch (e) {
    res.status(500).json({ error: "An internal server error occurred" })
  }
}
