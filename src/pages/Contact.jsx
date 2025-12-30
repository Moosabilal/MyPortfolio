import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheck } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                e.target.reset(); 
                setTimeout(() => setStatus(''), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
            });
    };

    return (
        <motion.div
            className="section container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: '150px', display: 'flex', alignItems: 'center', minHeight: '80vh' }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '50px' }}>
                <motion.div
                    style={{ flex: '1 1 400px' }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Let's <span className="gradient-text">Connect</span></h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={iconBoxStyle}><FaEnvelope /></div>
                            <div>
                                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</h4>
                                <a href="mailto:moosabilal75608@gmail.com" style={{ fontSize: '1.1rem', color: 'white', textDecoration: 'none' }}>moosabilal75608@gmail.com</a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={iconBoxStyle}><FaPhone /></div>
                            <div>
                                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone</h4>
                                <span style={{ fontSize: '1.1rem' }}>+91 7560873137</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={iconBoxStyle}><FaMapMarkerAlt /></div>
                            <div>
                                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Location</h4>
                                <span style={{ fontSize: '1.1rem' }}>Remote / Worldwide</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    style={{ flex: '1 1 400px', background: 'var(--bg-secondary)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 style={{ marginBottom: '20px' }}>Send me a message</h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Name</label>
                        <input type="text" name="user_name" placeholder="John Doe" required style={inputStyle} />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
                        <input type="email" name="user_email" placeholder="john@example.com" required style={inputStyle} />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Message</label>
                        <textarea name="message" rows="4" placeholder="Your message..." required style={inputStyle}></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        {status === 'success' ? <FaCheck /> : <FaPaperPlane />}
                    </button>
                    
                    {status === 'error' && (
                        <p style={{ color: '#ff4d4d', marginTop: '10px', textAlign: 'center' }}>
                            Failed to send. Please try again later.
                        </p>
                    )}
                </motion.form>
            </div>
        </motion.div>
    );
};

const iconBoxStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(99, 102, 241, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent-primary)',
    fontSize: '1.2rem'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    background: 'var(--bg-primary)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
};

export default Contact;