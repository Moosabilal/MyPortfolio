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
        <nav style={navStyle}>
            <div className="container" style={containerStyle}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link to="/" style={logoStyle}>Moosa<span style={{ color: 'var(--accent-primary)' }}>.dev</span></Link>
                </motion.div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <ul style={linkContainerStyle}>
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
                                        style={{
                                            ...linkStyle,
                                            background: 'none',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        to={link.path}
                                        style={{
                                            ...linkStyle,
                                            color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-primary)'
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Theme Switcher */}
                    <div style={{ position: 'relative' }}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                            style={iconBtnStyle}
                        >
                            {theme === 'dark' ? <FaMoon /> : theme === 'light' ? <FaSun /> : <FaWater />}
                        </motion.button>

                        <AnimatePresence>
                            {isThemeMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={themeMenuDropdown}
                                >
                                    <button onClick={() => { toggleTheme('dark'); setIsThemeMenuOpen(false); }} style={themeOptionStyle}>
                                        <FaMoon style={{ marginRight: '8px' }} /> Dark
                                    </button>
                                    <button onClick={() => { toggleTheme('light'); setIsThemeMenuOpen(false); }} style={themeOptionStyle}>
                                        <FaSun style={{ marginRight: '8px' }} /> Light
                                    </button>
                                    <button onClick={() => { toggleTheme('ocean'); setIsThemeMenuOpen(false); }} style={themeOptionStyle}>
                                        <FaWater style={{ marginRight: '8px' }} /> Ocean
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

// Styles (Partial update)
const navStyle = {
    height: 'var(--nav-height)',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    background: 'var(--bg-primary)', /* Updated to use var */
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.3s ease'
};

const containerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const logoStyle = { fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' };
const linkContainerStyle = { display: 'flex', gap: '30px' };
const linkStyle = { fontSize: '1rem', fontWeight: '600', position: 'relative', padding: '5px 0', cursor: 'pointer' };

const iconBtnStyle = {
    background: 'var(--bg-secondary)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-primary)',
    width: '40px', height: '40px',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer'
};

const themeMenuDropdown = {
    position: 'absolute',
    top: '50px', right: 0,
    background: 'var(--bg-secondary)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '10px',
    display: 'flex', flexDirection: 'column', gap: '5px',
    minWidth: '120px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
};

const themeOptionStyle = {
    display: 'flex', alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    background: 'transparent',
    color: 'var(--text-primary)',
    width: '100%', textAlign: 'left',
    hover: { background: 'rgba(255,255,255,0.1)' } // Handled via css usually, but inline for now
};

export default Navbar;
