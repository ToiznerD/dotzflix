import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '@/lib/prismadb'
import { APIResponse } from '@/types';
import { Genre } from '@/lib/genre'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { movie } = req.body as { movie: APIResponse };

        const searchMovie = await prismadb.movie.findMany({
            where: {
                title: movie.title,
            }
        })
        if (searchMovie.length !== 0) {
            return res.status(200).json(searchMovie[0]);
        }

        let genre = ''
        movie.genre_ids.forEach((id) => {
            genre += `${Genre[id]}, `
        })

        genre = genre.slice(0, genre.length - 2)
        
        const response = await axios(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=bf40f7b627cd8249046f4ccd432d018d`)
        const duration = response.data.runtime + " Minutes"

        const newMovie = await prismadb.movie.create({
            data: {
                title: movie.title,
                description: movie.overview,
                videoUrl: `https://vidsrc.to/embed/movie/${movie.id}`,
                thumbnailUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
                genre,
                duration,
            }
        })

        return res.status(200).json(newMovie);
    }
}