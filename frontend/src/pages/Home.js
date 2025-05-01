import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import AuthForm from '../components/AuthForm';
import Footer from '../components/Footer';
import '../scss/components/_buttons.scss'
import moodIcon from "../assets/images/mood-icon.png";
import journalIcon from "../assets/images/journal-icon.png";
import secureIcon from "../assets/images/secure-icon.png";

const Home = () => {
    const [authModal, setAuthModal] = useState(null);
    const [newlyRegistered, setNewlyRegistered] = useState(false);

    const modalRef = useRef(null);

    const AuthModal = ({ type }) => (
        <div className="auth-modal">
            <div className="modal-content" ref={modalRef}>
                <button
                    className="close-btn"
                    onClick={() => {
                        setAuthModal(null);
                        setNewlyRegistered(false);
                    }}
                >
                    ×
                </button>
                <AuthForm
                    type={type}
                    isModal={true}
                    onSuccess={() => {
                        if (type === 'register') {
                            // After registration, switch to login modal
                            setNewlyRegistered(true);
                            setAuthModal('login');
                        } else {
                            // After login, close modal (or redirect to dashboard)
                            setAuthModal(null);
                        }
                    }}
                    onSwitchType={() => setAuthModal(
                        type === 'login' ? 'register' : 'login'
                    )}
                    newlyRegistered={newlyRegistered}
                />
            </div>
        </div>
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setAuthModal(null);
                setNewlyRegistered(false);
            }
        };

        if (authModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [authModal]);

    return (
        <div className="home">
            {/* Auth Modal */}
            {authModal && <AuthModal type={authModal} />}
            <Navigation variant="landing" />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1>Find peace in <span className="highlight">progress.</span></h1>
                        <p className="subhead">
                            <span className="highlight">Solace</span> helps you track your therapy journey,
                            reflect on growth, and build emotional resilience—one day at a time.
                        </p>
                        <div className="cta-buttons">
                            <button
                                onClick={() => setAuthModal('register')}
                                className="btn btn--primary"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={() => setAuthModal('login')}
                                className="btn btn--secondary"
                            >
                                Login
                            </button>
                        </div>

                    </div>
                    <div className="hero-image">
                        <div className="app-mockup">
                            <div className="screen"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-container">
                    <h2>Your Mental Health <span className="highlight">Buddy</span></h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <img src={moodIcon} alt="Mood Tracking" className="feature-icon" />
                            <h3>Track Your Moods</h3>
                            <p>Log daily emotions, spot patterns, and celebrate small wins.</p>
                        </div>
                        <div className="feature-card">
                            <img src={journalIcon} alt="Journal prompts" className="feature-icon" />
                            <h3>Journal Prompts</h3>
                            <p>Guided reflections to deepen your self-awareness.</p>
                        </div>
                        <div className="feature-card">
                            <img src={secureIcon} alt="Security shield" className="feature-icon" />
                            <h3>Private & Secure</h3>
                            <p>Your data stays encrypted and confidential.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="testimonial-section">
                <blockquote>
                    "Solace gave me clarity in my hardest moments. It's like having a therapist in my pocket."
                    <cite>— Alex R., user since 2023</cite>
                </blockquote>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
                <div className="section-container">
                    <h2>Ready to start your journey?</h2>
                    <button
                        onClick={() => setAuthModal('register')}
                        className="btn btn--primary"
                    >
                        Create Your Account
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;