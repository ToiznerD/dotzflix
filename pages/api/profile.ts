import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '@/lib/prismadb';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(404).end();
        }

        const { profileName, user } = req.body;

        if (!profileName) {
            return res.status(400).json({ error: 'Please provide a profile name' });
        }

        if (!user) {
            return res.status(400).json({ error: 'User is invalid.' });
        }

        const profile = await prismadb.profile.create({
            data: {
                name: profileName,
                image: '/images/default-blue.png',
                userId: user.id,
            },
        });

        // // Fetch all profiles from the Profile table
        const profiles = await prismadb.profile.findMany({
            where: {
                userId: user.id
            },
        });

        return res.status(200).json( profiles );
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
    
}
