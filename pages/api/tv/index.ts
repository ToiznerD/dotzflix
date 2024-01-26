import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { APIResponse } from "@/types";
import { Genre } from "@/lib/genre";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        try {
            await serverAuth(req, res)

            const tvs = await prismadb.tV.findMany();

            return res.status(200).json(tvs);
        } catch (error) {
            console.log(error)
            return res.status(400).end()
        }
    }

    if (req.method === 'POST') {
        const { tv } = req.body as { tv: APIResponse };

        const searchTV = await prismadb.tV.findMany({
            where: {
                code: `${tv.id}`,
            }
        })

        if (searchTV.length !== 0) {
            return res.status(200).json(searchTV[0]);
        }

        let genre = ''
        tv.genre_ids.forEach((id) => {
            genre += `${Genre[id]}, `
        })

        genre = genre.slice(0, genre.length - 2)
        
        const newTv = await prismadb.tV.create({
            data: {
                title: tv.name ?? '',
                description: tv.overview,
                url: `${tv.id}`,
                thumbnailUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${tv.poster_path}`,
                genre,
                code: `${tv.id}`,
            }
        })

        return res.status(200).json(newTv);
    }
}