import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import About from './About';
import Education from './Education';
import Skills from './Skills';

const Home = () => {
    return (
        <div className="home-container">
            <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
                    <div style={{ maxWidth: '600px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)', marginBottom: '10px' }}>Hello, I'm</h2>
                            <h1 style={{ fontSize: '5rem', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '20px' }}>
                                Moosa.
                            </h1>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                                Full Stack <span className="gradient-text">Developer</span>
                            </h3>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px' }}>
                                I build immersive web experiences with modern technologies like React, Node.js, Express and MongoDB.
                                Turning ideas into reality through code.
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ display: 'flex', gap: '20px' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to="/projects" className="btn btn-primary">View My Work</Link>
                            <Link to="/contact" className="btn btn-outline">Contact Me</Link>
                        </motion.div>

                        <motion.div
                            style={{ marginTop: '50px', display: 'flex', gap: '20px', fontSize: '1.5rem' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a href="https://github.com/Moosabilal" style={{ color: 'var(--text-secondary)' }}><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" style={{ color: 'var(--text-secondary)' }}><FaLinkedin /></a>
                            <a href="mailto:moosabilal75608@gmail.com" style={{ color: 'var(--text-secondary)' }}><FaEnvelope /></a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{
                            width: '400px',
                            height: '400px',
                            background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            filter: 'blur(50px)',
                            opacity: 0.3,
                            position: 'absolute',
                            right: '10%',
                            zIndex: -1,
                            animation: 'morph 8s ease-in-out infinite'
                        }}
                    />
                </div>
            </section>

            <section id="about">
                <About />
            </section>

            <section id="education">
                <Education />
            </section>

            <section id="skills" style={{ paddingBottom: '100px' }}>
                <Skills />
            </section>

            <style>{`
        @keyframes morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
      `}</style>
        </div>
    );
};

export default Home;
