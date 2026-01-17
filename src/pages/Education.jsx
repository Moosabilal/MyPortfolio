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
            className="section container pt-[150px]"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4 text-center"
            >
                My <span className="gradient-text">Education</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center text-text-secondary mb-16"
            >
                My academic journey and qualifications.
            </motion.p>

            <div className="max-w-[800px] mx-auto relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10 z-0"></div>

                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-5 top-0 w-0.5 bg-accent-primary z-0"
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
                            className="mb-10 relative pl-[60px]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.3), type: 'spring' }}
                                className="absolute left-0 top-0 w-10 h-10 bg-bg-secondary rounded-full flex items-center justify-center border-2 border-accent-primary text-accent-primary text-lg z-10"
                            >
                                {edu.icon}
                            </motion.div>

                            <div className="bg-bg-secondary rounded-2xl p-6 border border-white/5 shadow-lg">
                                <span className="inline-block px-3 py-1 rounded-full bg-[rgba(99,102,241,0.1)] text-accent-primary text-xs mb-2.5 font-semibold">
                                    {edu.year}
                                </span>
                                <h3 className="text-2xl mb-1.5">{edu.degree}</h3>
                                <h4 className="text-lg text-text-secondary mb-2.5">
                                    {edu.institution}, {edu.location}
                                </h4>
                                <p className="text-text-secondary text-base">
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
