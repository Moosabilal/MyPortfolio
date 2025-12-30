import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaSchool, FaUniversity } from 'react-icons/fa';

const Education = () => {
    const educationData = [
        {
            year: "Oct 2024 - Present",
            degree: "Full Stack MERN Developer (Intensive Training)",
            institution: "Brocamp (Brototype)",
            location: "Koalikode, Kerala",
            desc: "Specialized in building scalable applications using the MERN stack.",
            icon: <FaLaptopCode />
        },
        {
            year: "2021 - 2024",
            degree: "Bachelor of Computer Applications (BCA)",
            institution: "Mangalore University/Shree Devi Institute of Technology",
            location: "Mangalore, Karnataka",
            desc: "Graduated with a focus on Software Development, Web Technologies, and Database Management.",
            icon: <FaGraduationCap />
        },
        {
            year: "2019 - 2021",
            degree: "Pre-University Course (PUC)",
            institution: "SAT Higher Secondary School",
            location: "Manjeshwar, kasaragod, Kerala",
            desc: "Completed Pre-University in Commerce stream (C++, Accountancy, Business Studies, Economics).",
            icon: <FaSchool />
        },
        {
            year: "2019",
            degree: "High School",
            institution: "SAT High School",
            location: "Manjeshwar, kasaragod, Kerala",
            icon: <FaUniversity />
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 50 }
        }
    };

    return (
        <div
            className="section container"
            style={{ paddingTop: '150px' }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}
            >
                My <span className="gradient-text">Education</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}
            >
                My academic journey and qualifications.
            </motion.p>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    zIndex: 0
                }}></div>

                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        left: '20px',
                        top: '0',
                        width: '2px',
                        background: 'var(--accent-primary)',
                        zIndex: 0
                    }}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            style={{
                                marginBottom: '40px',
                                position: 'relative',
                                paddingLeft: '60px'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.3), type: 'spring' }}
                                style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '0',
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid var(--accent-primary)',
                                    color: 'var(--accent-primary)',
                                    fontSize: '1.2rem',
                                    zIndex: 1
                                }}
                            >
                                {edu.icon}
                            </motion.div>

                            <div style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: '15px',
                                padding: '25px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--accent-primary)',
                                    fontSize: '0.8rem',
                                    marginBottom: '10px',
                                    fontWeight: '600'
                                }}>
                                    {edu.year}
                                </span>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{edu.degree}</h3>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                                    {edu.institution}, {edu.location}
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    {edu.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Education;
