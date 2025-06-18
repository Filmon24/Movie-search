import "../css/Favorite.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";


function Favorites() {

    const {favorites, clearAllFavorites} = useMovieContext();

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to remove all favorite movies?")) {
            clearAllFavorites();
        }
    }

    if (favorites.length > 0) {
        return (
            <div className="favorites">
                <div className="favorites-header">
                    <h2>Your Favorite Movies ({favorites.length})</h2>
                    <button 
                        onClick={handleClearAll}
                        className="clear-all-btn"
                    >
                        Clear All Favorites
                    </button>
                </div>
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
          <h2>No Favorite Movies Yet</h2>
          <p>Start adding movies to your favorites and they will appear here</p>
        </div>
      );
    }
}

export default Favorites 