import { useMovieContext } from "../contexts/MovieContext"

function StorageDebug() {
    const { favorites, isLoaded } = useMovieContext()

    const checkLocalStorage = () => {
        const stored = localStorage.getItem("favorites")
        console.log("localStorage favorites:", stored)
        console.log("Parsed favorites:", stored ? JSON.parse(stored) : null)
        console.log("Context favorites:", favorites)
        console.log("Is loaded:", isLoaded)
    }

    if (process.env.NODE_ENV === 'development') {
        return (
            <div style={{ 
                position: 'fixed', 
                bottom: '10px', 
                right: '10px', 
                background: 'rgba(0,0,0,0.8)', 
                color: 'white', 
                padding: '10px', 
                borderRadius: '5px',
                fontSize: '12px',
                zIndex: 9999
            }}>
                <div>Favorites: {favorites.length}</div>
                <div>Loaded: {isLoaded ? 'Yes' : 'No'}</div>
                <button onClick={checkLocalStorage} style={{ marginTop: '5px' }}>
                    Debug Storage
                </button>
            </div>
        )
    }

    return null
}

export default StorageDebug 