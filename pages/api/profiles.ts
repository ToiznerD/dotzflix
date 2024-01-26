

import { NextApiResponse, NextApiRequest } from 'next';

import prismadb from '@/lib/prismadb';

import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
    
        // // Fetch all profiles from the Profile table
        const profiles = await prismadb.profile.findMany({
            where: {
                userId: currentUser.id
            },
        });
        

        return res.status(200).json(profiles)
    } catch (err) {
        console.log(err);
        return res.status(400).end()
    }
}