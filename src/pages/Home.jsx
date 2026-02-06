import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

import About from './About';
import Education from './Education';
import Skills from './Skills';

const Home = () => {
    return (
        <div className="home-container">
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
                <div className="container flex items-center justify-between z-10 relative flex-col-reverse md:flex-row px-5 md:px-0">
                    <div className="max-w-[600px] flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl text-accent-secondary mb-2">Hello, I'm</h2>
                            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-5">
                                Moosa.
                            </h1>
                            <h3 className="text-3xl text-text-secondary mb-8">
                                Full Stack <span className="gradient-text">Developer</span>
                            </h3>
                            <p className="text-lg text-text-secondary mb-10 max-w-[500px]">
                                I build immersive web experiences with modern technologies like React, Node.js, Express and MongoDB.
                                Turning ideas into reality through code.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex gap-5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to="/projects" className="btn btn-primary">View My Work</Link>
                            <a
                                href="https://raw.githubusercontent.com/Moosabilal/Resume-Moosa-K--A/main/Resume(Moosa-K-A).pdf
"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline flex items-center gap-2"
                            >
                                Resume <FaFileDownload />
                            </a>
                            <Link to="/contact" className="btn btn-outline">Contact Me</Link>
                        </motion.div>

                        <motion.div
                            className="mt-12 flex gap-5 text-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a href="https://github.com/Moosabilal" className="text-text-secondary hover:text-accent-primary transition-colors"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" className="text-text-secondary hover:text-accent-primary transition-colors"><FaLinkedin /></a>
                            <a href="mailto:moosabilal75608@gmail.com" className="text-text-secondary hover:text-accent-primary transition-colors"><FaEnvelope /></a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] blur-[50px] opacity-30 absolute right-[10%] -z-10 animate-morph"
                    />
                </div>
            </section>

            <section id="about">
                <About />
            </section>

            <section id="education">
                <Education />
            </section>

            <section id="skills" className="pb-[100px]">
                <Skills />
            </section>
        </div>
    );
};

export default Home;
