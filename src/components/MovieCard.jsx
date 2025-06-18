import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useState } from "react"
import MovieModal from "./MovieModal"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    function onCardClick() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="movie-card" onClick={onCardClick}>
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title}/>
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                </div>
            </div>
            
            <MovieModal 
                movie={movie} 
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />
        </>
    )
}

export default MovieCard