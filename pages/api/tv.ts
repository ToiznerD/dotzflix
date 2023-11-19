// import { NextApiResponse, NextApiRequest } from 'next';
// import prismadb from '@/lib/prismadb'
// import { APIResponse } from '@/types';
// import { Genre } from '@/lib/genre'
// import axios from 'axios';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { tv } = req.body as { tv: APIResponse };

//         const searchTV = await prismadb.tV.findMany({
//             where: {
//                 title: tv.title,
//             }
//         })
//         if (searchTV.length !== 0) {
//             return res.status(200).json(searchTV[0]);
//         }

//         let genre = ''
//         tv.genre_ids.forEach((id) => {
//             genre += `${Genre[id]}, `
//         })

//         genre = genre.slice(0, genre.length - 2)
        
//         const response = await axios(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=bf40f7b627cd8249046f4ccd432d018d`)
//         const duration = response.data.runtime + " Minutes"

//         const newTv = await prismadb.tV.create({
//             data: {
//                 title: tv.title,
//                 description: tv.overview,
//                 url: `https://vidsrc.to/embed/movie/${movie.id}`,
//                 thumbnailUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
//                 genre,
//                 code: tv.code,
//             }
//         })

//         return res.status(200).json(newMovie);
//     }
// }