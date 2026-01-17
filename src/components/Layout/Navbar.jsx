import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaWater } from 'react-icons/fa'; // FaWater for Ocean theme
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

    const handleNavClick = (path, isHash) => {
        if (isHash) {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(path.replace('#', ''));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.getElementById(path.replace('#', ''));
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Regular route
        }
    };

    const links = [
        { name: 'Home', path: '#home', isHash: true },
        { name: 'About', path: '#about', isHash: true },
        { name: 'Education', path: '#education', isHash: true },
        { name: 'Skills', path: '#skills', isHash: true },
        { name: 'Projects', path: '/projects', isHash: false },
        { name: 'Contact', path: '/contact', isHash: false },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[1000] h-[var(--nav-height)] flex items-center bg-bg-primary/80 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
            <div className="container flex justify-between items-center px-5">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link to="/" className="text-2xl font-bold tracking-tighter">
                        Moosa<span className="text-accent-primary">.dev</span>
                    </Link>
                </motion.div>

                <div className="flex items-center gap-8">
                    {/* PC Menu */}
                    <ul className="hidden md:flex gap-8">
                        {links.map((link, index) => (
                            <motion.li
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {link.isHash ? (
                                    <button
                                        onClick={() => handleNavClick(link.path, true)}
                                        className="text-base font-semibold relative py-1 cursor-pointer bg-transparent text-text-primary hover:text-accent-primary transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`text-base font-semibold relative py-1 cursor-pointer transition-colors ${location.pathname === link.path ? 'text-accent-primary' : 'text-text-primary hover:text-accent-primary'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Theme Switcher */}
                    <div className="relative z-50">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                            className="w-10 h-10 rounded-full bg-bg-secondary border border-white/10 flex items-center justify-center text-text-primary cursor-pointer"
                        >
                            {theme === 'dark' ? <FaMoon /> : theme === 'light' ? <FaSun /> : <FaWater />}
                        </motion.button>

                        <AnimatePresence>
                            {isThemeMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-[50px] right-0 bg-bg-secondary border border-white/10 rounded-xl p-2.5 flex flex-col gap-1.5 min-w-[120px] shadow-2xl"
                                >
                                    <button onClick={() => { toggleTheme('dark'); setIsThemeMenuOpen(false); }} className="flex items-center w-full px-3 py-2 rounded-lg bg-transparent text-text-primary text-left hover:bg-white/10 transition-colors">
                                        <FaMoon className="mr-2" /> Dark
                                    </button>
                                    <button onClick={() => { toggleTheme('light'); setIsThemeMenuOpen(false); }} className="flex items-center w-full px-3 py-2 rounded-lg bg-transparent text-text-primary text-left hover:bg-white/10 transition-colors">
                                        <FaSun className="mr-2" /> Light
                                    </button>
                                    <button onClick={() => { toggleTheme('ocean'); setIsThemeMenuOpen(false); }} className="flex items-center w-full px-3 py-2 rounded-lg bg-transparent text-text-primary text-left hover:bg-white/10 transition-colors">
                                        <FaWater className="mr-2" /> Ocean
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
