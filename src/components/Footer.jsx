import "../css/Footer.css"

function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <span className="footer-brand">Movie App</span>
                    <span className="footer-sep">•</span>
                    <span className="footer-copy">© {currentYear}</span>
                </div>
                <div className="footer-right">
                    <a 
                        className="footer-link" 
                        href="https://github.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <span className="footer-icon" aria-hidden>🐙</span>
                        <span className="footer-link-text">GitHub</span>
                    </a>
                    <a 
                        className="footer-link" 
                        href="https://www.linkedin/filmonataklty.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <span className="footer-icon" aria-hidden>🔗</span>
                        <span className="footer-link-text">LinkedIn</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer


