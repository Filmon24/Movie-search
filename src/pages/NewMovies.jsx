import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"
import { getNewMovies } from "../services/api"
import "../css/Home.css"

function NewMovies() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const { results, totalPages: tp, page: p } = await getNewMovies(1)
        setMovies(results)
        setTotalPages(tp)
        setPage(p)
      } catch (err) {
        console.log(err)
        setError("Failed to load new movies...")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const goToPage = async (targetPage) => {
    if (loading) return
    if (targetPage < 1 || targetPage > totalPages) return
    setLoading(true)
    try {
      const { results, page: p } = await getNewMovies(targetPage)
      setMovies(results)
      setPage(p)
    } catch (err) {
      console.log(err)
      setError("Failed to change page...")
    } finally {
      setLoading(false)
    }
  }

  const handlePrev = () => goToPage(page - 1)
  const handleNext = () => goToPage(page + 1)

  return (
    <div className="home">
      <h2 style={{textAlign: "center", margin: "0 0 1rem"}}>New Movies</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <h3>No new movies</h3>
          <p>There are no newly released movies to display right now.</p>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button 
                className="pagination-button"
                onClick={handlePrev}
                disabled={loading || page === 1}
                aria-label="Previous page"
                title="Previous page"
              >
                
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="pagination-info">Page {page} of {totalPages}</div>
              <button 
                className="pagination-button"
                onClick={handleNext}
                disabled={loading || page === totalPages}
                aria-label="Next page"
                title="Next page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default NewMovies


