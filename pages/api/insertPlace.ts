// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '@/lib/dbConnect'
import place from '@/models/place'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const places = await place.find() /* find all the data in our database */
                res.status(200).json(places)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const places = await place.create(req.body) /* create a new model in the database */
                res.status(201).json({ success: true, data: place })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
        // res.status(400).json({ success: false })
        // break
    }
}
