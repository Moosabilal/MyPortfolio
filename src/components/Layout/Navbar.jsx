import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaWater, FaBars, FaTimes } from 'react-icons/fa'; 
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const handleNavClick = (path, isHash) => {
        setIsMobileMenuOpen(false); // Close menu on click
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
        }
    };

    const links = [
        { name: 'Home', path: '#home', isHash: true },
        { name: 'About', path: '#about', isHash: true },
        { name: 'Education', path: '#education', isHash: true },
        { name: 'Skills', path: '#skills', isHash: true },
        { name: 'Certificates', path: '#certificates', isHash: true },
        { name: 'Projects', path: '/projects', isHash: false },
        { name: 'Contact', path: '/contact', isHash: false },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[1000] h-[70px] flex items-center bg-bg-primary/80 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
            <div className="container mx-auto flex justify-between items-center px-5">
                {/* Logo */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Link to="/" className="text-2xl font-bold tracking-tighter">
                        Moosa<span className="text-accent-primary">.dev</span>
                    </Link>
                </motion.div>

                <div className="flex items-center gap-4 md:gap-8">
                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex gap-8">
                        {links.map((link, index) => (
                            <motion.li key={link.name} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                {link.isHash ? (
                                    <button onClick={() => handleNavClick(link.path, true)} className="text-base font-semibold bg-transparent text-text-primary hover:text-accent-primary transition-colors">
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link to={link.path} className={`text-base font-semibold transition-colors ${location.pathname === link.path ? 'text-accent-primary' : 'text-text-primary hover:text-accent-primary'}`}>
                                        {link.name}
                                    </Link>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Theme Toggle */}
                    <div className="relative">
                        <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="w-10 h-10 rounded-full bg-bg-secondary border border-white/10 flex items-center justify-center text-text-primary">
                            {theme === 'dark' ? <FaMoon /> : theme === 'light' ? <FaSun /> : <FaWater />}
                        </button>
                        <AnimatePresence>
                            {isThemeMenuOpen && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[50px] right-0 bg-bg-secondary border border-white/10 rounded-xl p-2 flex flex-col min-w-[120px] shadow-2xl">
                                    {['dark', 'light', 'ocean'].map((t) => (
                                        <button key={t} onClick={() => { toggleTheme(t); setIsThemeMenuOpen(false); }} className="flex items-center w-full px-3 py-2 rounded-lg text-text-primary capitalize hover:bg-white/10">
                                            {t === 'dark' ? <FaMoon className="mr-2"/> : t === 'light' ? <FaSun className="mr-2"/> : <FaWater className="mr-2"/>} {t}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-2xl text-text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Sidebar/Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-bg-primary z-[999] flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {links.map((link) => (
                            <div key={link.name}>
                                {link.isHash ? (
                                    <button 
                                        onClick={() => handleNavClick(link.path, true)}
                                        className="text-2xl font-bold text-text-primary"
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link 
                                        to={link.path} 
                                        className="text-2xl font-bold text-text-primary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;