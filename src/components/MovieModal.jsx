import "../css/MovieModal.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieModal({ movie, isOpen, onClose }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie?.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    if (!isOpen || !movie) return null

    return (
        <div className="movie-modal-overlay" onClick={onClose}>
            <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                
                <div className="modal-content">
                    <div className="modal-poster">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                            alt={movie.title}
                        />
                    </div>
                    
                    <div className="modal-info">
                        <div className="modal-header">
                            <h1>{movie.title}</h1>
                            <button 
                                className={`modal-favorite-btn ${favorite ? "active" : ""}`} 
                                onClick={onFavoriteClick}
                            >
                                ♥
                            </button>
                        </div>
                        
                        <div className="modal-details">
                            <p className="release-date">
                                <strong>Release Date:</strong> {movie.release_date}
                            </p>
                            
                            <p className="rating">
                                <strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)}/10
                            </p>
                            
                            <p className="vote-count">
                                <strong>Vote Count:</strong> {movie.vote_count?.toLocaleString()}
                            </p>
                            
                            <p className="overview">
                                <strong>Overview:</strong>
                            </p>
                            <p className="overview-text">
                                {movie.overview || "No overview available for this movie."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal 