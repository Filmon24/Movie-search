import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("popular"); // "popular" | "search"

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const { results, totalPages: tp, page: p } = await getPopularMovies(1);
        setMovies(results);
        setTotalPages(tp);
        setPage(p);
        setMode("popular");
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const { results, totalPages: tp, page: p } = await searchMovies(searchQuery, 1)
        setMovies(results)
        setTotalPages(tp)
        setPage(p)
        setMode("search")
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  const goToPage = async (targetPage) => {
    if (loading) return;
    if (targetPage < 1 || targetPage > totalPages) return;
    setLoading(true);
    try {
      if (mode === "popular") {
        const { results, page: p } = await getPopularMovies(targetPage);
        setMovies(results);
        setPage(p);
      } else {
        const { results, page: p } = await searchMovies(searchQuery, targetPage);
        setMovies(results);
        setPage(p);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to change page...");
    } finally {
      setLoading(false);
    }
  }

  const handlePrev = () => goToPage(page - 1);
  const handleNext = () => goToPage(page + 1);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <h3>No movies found</h3>
          {searchQuery ? (
            <p>We couldn't find any results for "{searchQuery}". Try another search.</p>
          ) : (
            <p>There are no movies to display right now.</p>
          )}
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
                disabled={loading || page === 20}
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
  );
}

export default Home;
