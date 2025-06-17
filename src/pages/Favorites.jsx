import "../css/Favorite.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";


function Favorites() {

    const {favorites} = useMovieContext();

    if (favorites.length > 0) {
        return (
            <div className="favorites">
                <h2> your Favorite Movies</h2>
                <div className="movie-grid">
                {favorites.map((movie) =>(  
                <MovieCard movie={movie} key={movie.id} />
                ))}
                </div>
            </div>
        );
    } else {

      return ( 
        <div className="favorites-empty">
          <h2> No Favorite Movies Yet</h2>
          <p>start adding movies to your favorites and they will appear hear</p>
        </div>
      );
    }
}

export default Favorites 