const API_KEY = "592f0bc405c59d61b1bda7fc1b4e482d";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results;
};

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