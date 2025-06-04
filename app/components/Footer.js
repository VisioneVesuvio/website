'use client';

import Link from 'next/link';
import '@/app/styles/footer.css'; // Assicurati che il percorso sia corretto

// SVG Icons (puoi sostituirli con i tuoi o usare una libreria di icone)
const IconX = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg-icon">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const IconFacebook = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg-icon">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.088h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
    </svg>
);

const IconInstagram = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="social-svg-icon">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.172.052 1.791.218 2.227.421.448.207.747.481.972.713.228.232.493.516.703.953.212.443.372 1.05.422 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.052 1.172-.218 1.791-.421 2.227-.207.448-.481.747-.713.972-.232.228-.516.493-.953.703-.443.212-1.05.372-2.227.422-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.172-.052-1.791-.218-2.227-.421-.448-.207-.747.481-.972-.713-.228-.232-.493-.516-.703-.953-.212-.443-.372-1.05-.422-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.052-1.172.218 1.791.421 2.227.207.448.481.747.713.972.232.228.516.493.953.703.443.212 1.05.372 2.227.422.001-.001.286-.058 1.646-.07.346-.058 4.85-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.177.224-2.948.512-.784.293-1.438.68-2.09 1.336s-.935 1.296-1.225 2.082c-.292.777-.458 1.68-.517 2.948-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.28.224 2.177.512 2.948.293.784.68 1.438 1.336 2.09s1.296.935 2.082 1.225c.777.292 1.68.458 2.948.517 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.28-.058 2.177-.224 2.948-.512.784-.293 1.438-.68 2.09-1.336s-.935 1.296 1.225-2.082c.292-.777-.458-1.68-.517-2.948.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.28-.224-2.177-.512-2.948-.293-.784-.68-1.438-1.336-2.09s-1.296-.935-2.082-1.225c-.777-.292-1.68-.458-2.948-.517C15.667.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.333c-2.309 0-4.171-1.861-4.171-4.171s1.861-4.171 4.171-4.171 4.171 1.861 4.171 4.171-1.861 4.171-4.171 4.171zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);


export default function Footer() {
    // Sostituisci con i tuoi link social effettivi
    const socialLinks = {
        twitter: "https://x.com/chucknorris",
        facebook: "https://www.facebook.com/profile.php?id=61563987746027",
        instagram: "https://www.instagram.com/visionevesuvio/"
    };

    return (
        <footer className="footer">
            <div className="footer-content-wrapper">
                <div className="footer-section footer-contact">
                    <a href="mailto:associazione.visionevesuvio@gmail.com" className="footer-email-link">
                        associazione.visionevesuvio@gmail.com
                    </a>
                </div>

                <div className="footer-section footer-social">
                    <p className="footer-social-heading">SEGUICI:</p>
                    <div className="footer-social-icon-group">
                        <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Seguici su X (ex Twitter)" className="social-icon-link">
                            <IconX />
                        </Link>
                        <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Seguici su Facebook" className="social-icon-link">
                            <IconFacebook />
                        </Link>
                        <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Seguici su Instagram" className="social-icon-link">
                            <IconInstagram />
                        </Link>
                    </div>
                </div>

                <div className="footer-section footer-copyright">
                    <p className="footer-copyright-text">by Evolve © {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
}