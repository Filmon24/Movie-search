import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load favorites from localStorage on component mount
    useEffect(() => {
        try {
            const storedFavs = localStorage.getItem("favorites")
            if (storedFavs) {
                const parsedFavs = JSON.parse(storedFavs)
                if (Array.isArray(parsedFavs)) {
                    setFavorites(parsedFavs)
                }
            }
        } catch (error) {
            console.error("Error loading favorites from localStorage:", error)
            // If there's an error, clear the corrupted data
            localStorage.removeItem("favorites")
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Save favorites to localStorage whenever favorites change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem('favorites', JSON.stringify(favorites))
            } catch (error) {
                console.error("Error saving favorites to localStorage:", error)
            }
        }
    }, [favorites, isLoaded])

    const addToFavorites = (movie) => {
        // Check if movie is already in favorites
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites(prev => [...prev, movie])
        }
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const clearAllFavorites = () => {
        setFavorites([])
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearAllFavorites,
        isLoaded
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}