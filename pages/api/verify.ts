import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { id } = req.body;


            const user = await prismadb.user.update({
                where: {
                    id: id,
                },
                data: {
                    emailVerified: true
                }
            })

            return res.status(200).json(user);
        }


        return res.status(405).end();
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}