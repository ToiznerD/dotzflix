import { NextApiResponse, NextApiRequest } from 'next';

import prismadb from '@/lib/prismadb';

import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { profileId } = req.query;
        const singleProfileId = Array.isArray(profileId) ? profileId[0] : profileId;
        const profile = await prismadb.profile.findUnique({
            where: {
                id: singleProfileId
            }
        })

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: profile?.favoriteIds
                }
            }
        })

        const favoriteTvs = await prismadb.tV.findMany({
            where: {
                id: {
                    in: profile?.favoriteIds
                }
            }
        })

        return res.status(200).json({ favoriteMovies, favoriteTvs })
    } catch (err) {
        console.log(err);
        return res.status(400).end()
    }
}