import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '@/lib/prismadb'
import { APIResponse } from '@/types';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { movie } = req.body as { movie: APIResponse };

        const searchMovie = await prismadb.movie.findMany({
            where: {
                title: movie.title,
            }
        })
        console.log(searchMovie);
        if (searchMovie.length !== 0) {
            return res.status(200).json(searchMovie[0]);
        }

        const newMovie = await prismadb.movie.create({
            data: {
                title: movie.title,
                description: movie.overview,
                videoUrl: `https://vidsrc.to/embed/movie/${movie.id}`,
                thumbnailUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
                genre: '',
                duration: '',
            }
        })

        console.log(newMovie);
        return res.status(200).json(newMovie);
    }
}