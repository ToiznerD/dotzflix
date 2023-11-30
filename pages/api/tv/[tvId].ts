import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try {
        await serverAuth(req, res);

        const { tvId } = req.query;

        if (typeof tvId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!tvId) {
            throw new Error('Invalid ID')
        }

        const tv = await prismadb.tV.findUnique({
            where: {
                id: tvId,
            }
        })


        if (!tv) {
            throw new Error('TV not found')
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjQwZjdiNjI3Y2Q4MjQ5MDQ2ZjRjY2Q0MzJkMDE4ZCIsInN1YiI6IjY1NTUzNmE3ZDRmZTA0MDBmZTA1ZjBlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MFzOpfr5J08tXaPLtmjMmH4JITxbg8BfBMFNeVLbqc'
            }
        }

        const response = await axios.get(`https://api.themoviedb.org/3/tv/${tv.code}?language=en-US`, options);

        const seasons = response.data.seasons


        return res.status(200).json({tv, seasons});
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}