

import { NextApiResponse, NextApiRequest } from 'next';

import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        // // Fetch all unverified users from the User table
        const users = await prismadb.user.findMany({
            where: {
                OR: [
                    {
                        emailVerified: false,
                    },
                    {
                        emailVerified: null,
                    },
                ],
            },
        });
        
        

        return res.status(200).json(users)
    } catch (err) {
        console.log(err);
        return res.status(400).end()
    }
}