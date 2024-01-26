import { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash';
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { movieId, profileId, type } = req.body;
            let existingMovie;
            if (type === 'movie') {
                 existingMovie = await prismadb.movie.findUnique({
                    where: {
                        id: movieId
                    }
                })
            } else {
                existingMovie = await prismadb.tV.findUnique({
                    where: {
                        id: movieId
                    }
                })
            }
           
            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const profile = await prismadb.profile.update({
                where: {
                    id: profileId,
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            })

            return res.status(200).json(profile);
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);
            
            const { movieId, profileId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            })

            if (!existingMovie) {
                const existingTv = await prismadb.movie.findUnique({
                    where: {
                        id: movieId,
                    }
                })

                if (!existingTv) {
                    throw new Error('Invalid ID')
                }
            }

            

            const profile = await prismadb.profile.findUnique({
                where: {
                    id: profileId,
                }
            })

            if (!profile) {
                throw new Error('Profile not found')
            }

            const updatedFavoriteIds = without(profile.favoriteIds, movieId)

            const updatedProfile = await prismadb.profile.update({
                where: {
                    id: profileId,
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            })

            return res.status(200).json(updatedProfile);
        }

        return res.status(405).end();
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}