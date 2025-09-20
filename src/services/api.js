const API_KEY = "592f0bc405c59d61b1bda7fc1b4e482d";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json()
    return {
        results: data.results ?? [],
        totalPages: data.total_pages ?? 1,
        totalResults: data.total_results ?? 0,
        page: data.page ?? page
    }
};

export const searchMovies = async (query, page = 1) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json()
    return {
        results: data.results ?? [],
        totalPages: data.total_pages ?? 1,
        totalResults: data.total_results ?? 0,
        page: data.page ?? page
    }
};

export const getNewMovies = async (page = 1) => {
    // TMDB "Now Playing" represents newly released movies in theaters
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    return {
        results: data.results ?? [],
        totalPages: data.total_pages ?? 1,
        totalResults: data.total_results ?? 0,
        page: data.page ?? page
    }
}

export const getMovieTrailers = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();
        
        // Filter for trailers and official videos
        const trailers = data.results.filter(video => 
            video.type === "Trailer" && 
            video.site === "YouTube" &&
            video.official === true
        );
        
        return trailers;
    } catch (error) {
        console.error("Error fetching trailers:", error);
        return [];
    }
};