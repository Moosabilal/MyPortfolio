import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            padding: '40px 0',
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <a href="https://github.com/Moosabilal" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaLinkedin /></a>
                    <a href="mailto:moosabilal75608@gmail.com" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}><FaEnvelope /></a>
                </div>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                    &copy; {new Date().getFullYear()} Moosa. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
