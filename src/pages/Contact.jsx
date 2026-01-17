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
            className="section container pt-[150px] flex items-center min-h-[80vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex flex-wrap w-full gap-12">
                <motion.div
                    className="flex-[1_1_400px]"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-5xl mb-4">Let's <span className="gradient-text">Connect</span></h1>
                    <p className="text-text-secondary mb-12 text-lg">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-4">
                            <div className="w-[50px] h-[50px] rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-xl"><FaEnvelope /></div>
                            <div>
                                <h4 className="text-text-secondary text-sm">Email</h4>
                                <a href="mailto:moosabilal75608@gmail.com" className="text-lg text-white no-underline hover:text-accent-primary transition-colors">moosabilal75608@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[50px] h-[50px] rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-xl"><FaPhone /></div>
                            <div>
                                <h4 className="text-text-secondary text-sm">Phone</h4>
                                <span className="text-lg">+91 7560873137</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[50px] h-[50px] rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary text-xl"><FaMapMarkerAlt /></div>
                            <div>
                                <h4 className="text-text-secondary text-sm">Location</h4>
                                <span className="text-lg">Remote / Worldwide</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    className="flex-[1_1_400px] bg-bg-secondary p-10 rounded-[20px] border border-white/5 shadow-lg"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-2xl mb-5">Send me a message</h3>

                    <div className="mb-5">
                        <label className="block mb-2 text-text-secondary">Name</label>
                        <input type="text" name="user_name" placeholder="John Doe" required className="w-full p-3 bg-bg-primary border border-white/10 rounded-lg text-white text-base outline-none focus:border-accent-primary transition-colors" />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-text-secondary">Email</label>
                        <input type="email" name="user_email" placeholder="john@example.com" required className="w-full p-3 bg-bg-primary border border-white/10 rounded-lg text-white text-base outline-none focus:border-accent-primary transition-colors" />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-text-secondary">Message</label>
                        <textarea name="message" rows="4" placeholder="Your message..." required className="w-full p-3 bg-bg-primary border border-white/10 rounded-lg text-white text-base outline-none focus:border-accent-primary transition-colors"></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        {status === 'success' ? <FaCheck /> : <FaPaperPlane />}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-500 mt-2.5 text-center">
                            Failed to send. Please try again later.
                        </p>
                    )}
                </motion.form>
            </div>
        </motion.div>
    );
};

export default Contact;