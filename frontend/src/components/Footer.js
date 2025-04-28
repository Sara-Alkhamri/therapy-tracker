import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/layout/_footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>

                <p className="footer__copyright">
                    © {new Date().getFullYear()} Solace. All rights reserved.
                </p>

                <div className="footer__newsletter">
                    <h3>Stay Updated</h3>
                    <div className="footer__newsletter-form">
                        <input
                            type="email"
                            placeholder="Your email"
                        />
                        <button type="button">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;