import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-bg-secondary py-10 text-center border-t border-white/5 mt-auto relative z-10">
            <div className="flex justify-center gap-8 mb-8">
                <a href="https://github.com/Moosabilal" className="text-2xl text-text-secondary hover:text-accent-primary transition-all duration-300 hover:-translate-y-1 inline-block"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" className="text-2xl text-text-secondary hover:text-accent-primary transition-all duration-300 hover:-translate-y-1 inline-block"><FaLinkedin /></a>
                <a href="mailto:moosabilal75608@gmail.com" className="text-2xl text-text-secondary hover:text-accent-primary transition-all duration-300 hover:-translate-y-1 inline-block"><FaEnvelope /></a>
            </div>
            <p className="text-text-secondary text-sm">
                Designed and Built by Moosa <span className="text-red-500 text-lg align-middle mx-1"><FaHeart className="inline" /></span>
            </p>
            <p className="text-text-secondary text-xs mt-2 opacity-50">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
