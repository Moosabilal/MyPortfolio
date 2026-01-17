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
            className="section container pt-20 md:pt-32 lg:pt-[150px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-7xl mb-8"
            >
                About <span className="gradient-text">Me</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="max-w-[800px] text-xl text-text-secondary mb-12">
                <p className="mb-6">
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
                className="text-3xl mb-6 mt-12"
            >
                Soft Skills
            </motion.h2>

            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
                        whileHover={{ scale: 1.05 }}
                        className="p-5 border border-white/10 rounded-xl transition-all duration-300 cursor-default hover:bg-bg-secondary hover:border-accent-primary"
                    >
                        <h3 className="mb-2.5 text-accent-primary font-bold">{skill.title}</h3>
                        <p className="text-sm text-text-secondary">{skill.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default About;
