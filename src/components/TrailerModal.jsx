import { useState, useEffect } from "react";
import { getMovieTrailers } from "../services/api";
import "../css/TrailerModal.css";

function TrailerModal({ movie, isOpen, onClose }) {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    useEffect(() => {
        if (isOpen && movie) {
            fetchTrailers();
        }
    }, [isOpen, movie]);

    const fetchTrailers = async () => {
        setLoading(true);
        try {
            const trailerData = await getMovieTrailers(movie.id);
            setTrailers(trailerData);
            if (trailerData.length > 0) {
                setSelectedTrailer(trailerData[0]);
            }
        } catch (error) {
            console.error("Error fetching trailers:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadTrailer = async (trailer) => {
        try {
            // Create a temporary link to download the trailer
            const link = document.createElement('a');
            link.href = `https://www.youtube.com/watch?v=${trailer.key}`;
            link.target = '_blank';
            link.download = `${movie.title}-${trailer.name}.mp4`;
            link.click();
        } catch (error) {
            console.error("Error downloading trailer:", error);
            alert("Unable to download trailer. Please try again.");
        }
    };

    const openTrailerInNewTab = (trailer) => {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    };

    if (!isOpen || !movie) return null;

    return (
        <div className="trailer-modal-overlay" onClick={onClose}>
            <div className="trailer-modal" onClick={(e) => e.stopPropagation()}>
                <button className="trailer-modal-close-btn" onClick={onClose}>×</button>
                
                <div className="trailer-modal-content">
                    <div className="trailer-modal-header">
                        <h2>🎬 {movie.title} - Trailers</h2>
                    </div>

                    {loading ? (
                        <div className="trailer-loading">
                            <div className="loading-spinner"></div>
                            <p>Loading trailers...</p>
                        </div>
                    ) : trailers.length > 0 ? (
                        <div className="trailer-content">
                            {selectedTrailer && (
                                <div className="trailer-video-container">
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
                                        title={selectedTrailer.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            <div className="trailer-list">
                                <h3>Available Trailers:</h3>
                                {trailers.map((trailer, index) => (
                                    <div 
                                        key={trailer.key} 
                                        className={`trailer-item ${selectedTrailer?.key === trailer.key ? 'active' : ''}`}
                                    >
                                        <div className="trailer-info">
                                            <h4>{trailer.name}</h4>
                                            <p>{trailer.type} • {trailer.size}p</p>
                                        </div>
                                        <div className="trailer-actions">
                                            <button 
                                                className="trailer-watch-btn"
                                                onClick={() => setSelectedTrailer(trailer)}
                                            >
                                                Watch
                                            </button>
                                            <button 
                                                className="trailer-download-btn"
                                                onClick={() => downloadTrailer(trailer)}
                                            >
                                                Download
                                            </button>
                                            <button 
                                                className="trailer-external-btn"
                                                onClick={() => openTrailerInNewTab(trailer)}
                                            >
                                                Open in YouTube
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="trailer-empty">
                            <p>No trailers available for this movie.</p>
                            <p>Try searching for the movie on YouTube instead.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrailerModal; 