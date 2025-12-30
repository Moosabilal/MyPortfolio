import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <motion.div
            className="section container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ paddingTop: '150px' }}
        >
            <motion.h1
                variants={itemVariants}
                style={{ fontSize: '3rem', marginBottom: '2rem' }}
            >
                About <span className="gradient-text">Me</span>
            </motion.h1>

            <motion.div variants={itemVariants} style={{ maxWidth: '800px', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    I am a passionate Full Stack Developer with a knack for building robust and scalable web applications.
                    With a strong foundation in the MERN stack (MongoDB, Express, React, Node.js), I love solving complex problems and creating intuitive user experiences.
                </p>
                <p>
                    My journey in web development is driven by curiosity and a desire to learn.
                    Whether it's mastering a new framework or optimizing backend performance, I am always ready for a challenge.
                </p>
            </motion.div>

            <motion.h2
                variants={itemVariants}
                style={{ fontSize: '2rem', marginBottom: '1.5rem', marginTop: '3rem' }}
            >
                Soft Skills
            </motion.h2>

            <motion.div
                variants={containerVariants}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}
            >
                {[
                    { title: "Adaptability", desc: "Quickly adjusting to new technologies and changing project requirements." },
                    { title: "Problem Solving", desc: "Analyzing complex issues and finding efficient solutions." },
                    { title: "Communication", desc: "Collaborating effectively with teams and stakeholders." },
                    { title: "Time Management", desc: "Prioritizing tasks to meet deadlines without compromising quality." }
                ].map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--accent-primary)' }}
                        style={{
                            padding: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            transition: 'border-color 0.3s ease',
                            cursor: 'default'
                        }}
                    >
                        <h3 style={{ marginBottom: '10px', color: 'var(--accent-primary)' }}>{skill.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{skill.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default About;
