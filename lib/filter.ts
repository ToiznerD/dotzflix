import { APIResponse } from "@/types";

export function filterMovies(movies: APIResponse[]) {
    const filteredMovies = movies.filter((movie) => movie.media_type !== 'person' && movie.poster_path)
    
    return filteredMovies;
}

