import { filterMovies } from '@/lib/filter';
import axios from 'axios';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(404).end();
    }
    const { query } = req.query;

    const queryUrl = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    
    const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjQwZjdiNjI3Y2Q4MjQ5MDQ2ZjRjY2Q0MzJkMDE4ZCIsInN1YiI6IjY1NTUzNmE3ZDRmZTA0MDBmZTA1ZjBlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MFzOpfr5J08tXaPLtmjMmH4JITxbg8BfBMFNeVLbqc'
            }
    };
    
    const response = await axios.get(queryUrl, options);
    const filteredMovies = filterMovies(response.data.results);

    return res.status(200).json(filteredMovies);
    
}