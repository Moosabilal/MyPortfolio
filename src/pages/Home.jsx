import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

import About from './About';
import Education from './Education';
import Skills from './Skills';
import Certificates from './Certificates';

const Home = () => {
    return (
        <div className="home-container w-full overflow-x-hidden">
            <section id="home" className="min-h-screen flex items-center justify-center relative py-20 md:py-0">
                <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between z-10 relative">
                    
                    <div className="w-full md:max-w-[600px] flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl md:text-2xl text-accent-secondary mb-2 font-medium">Hello, I'm</h2>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4">
                                Moosa.
                            </h1>
                            <h3 className="text-2xl md:text-3xl text-text-secondary mb-6">
                                Full Stack <span className="gradient-text">Developer</span>
                            </h3>
                            <p className="text-base md:text-lg text-text-secondary mb-8 max-w-[500px] leading-relaxed">
                                I build immersive web experiences with modern technologies like React, Node.js, Express and MongoDB.
                                Turning ideas into reality through code.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap justify-center md:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to="/projects" className="btn btn-primary px-6 py-3 rounded-lg">View My Work</Link>
                            <a
                                href="https://raw.githubusercontent.com/Moosabilal/Resume-Moosa-K--A/main/Resume(Moosa-K-A).pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline flex items-center gap-2 px-6 py-3 rounded-lg border"
                            >
                                Resume <FaFileDownload />
                            </a>
                            <Link to="/contact" className="btn btn-outline px-6 py-3 rounded-lg border">Contact Me</Link>
                        </motion.div>

                        <motion.div
                            className="mt-10 flex gap-6 text-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <a href="https://github.com/Moosabilal" className="text-text-secondary hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" className="text-text-secondary hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1"><FaLinkedin /></a>
                            <a href="mailto:moosabilal75608@gmail.com" className="text-text-secondary hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1"><FaEnvelope /></a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="
                            w-[250px] h-[250px] 
                            md:w-[450px] md:h-[450px] 
                            bg-gradient-to-tr from-accent-primary to-accent-secondary 
                            rounded-full blur-[60px] md:blur-[100px] 
                            opacity-20 md:opacity-30 
                            absolute md:relative
                            top-10 md:top-0
                            -z-10 animate-morph
                        "
                    />
                </div>
            </section>

            <section id="about" className="w-full">
                <About />
            </section>

            <section id="education" className="w-full">
                <Education />
            </section>

            <section id="skills" className="pb-20 w-full">
                <Skills />
            </section>

            <section id="certificates" className="pb-20 w-full">
                <Certificates />
            </section>
        </div>
    );
};

export default Home;