import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: "QuickMate — Job Service Platform",
            desc: "On-demand service booking platform with real-time chat & video calls. Architected using the Repository Pattern and SOLID principles for scalability.",
            tech: ["MERN Stack", "TypeScript", "Socket.IO", "WebRTC", "AWS EC2", "JWT", "Redux", "Razorpay"],
            link: "#",
            github: {
                frontend: "https://github.com/Moosabilal/Quickmate-frontend",
                backend: "https://github.com/Moosabilal/Quickmate-backend"
            }
        },
        {
            title: "Eagleswing — Fashion E-Commerce",
            desc: "High-performance B2C clothing store featuring Server-Side Rendering (SSR) for SEO. Includes secure Razorpay payments, wallet system, and inventory management. Wait a little bit render takes 50 seconds to deploy free render server",
            tech: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Razorpay"],
            link: "https://ecommerce-project-2ua0.onrender.com",
            github: "https://github.com/Moosabilal/eCommerce"
        },
        {
            title: "User Management System",
            desc: "A secure admin dashboard featuring JWT authentication, Redux Toolkit for global state management, and full CRUD operations.",
            tech: ["MERN Stack", "Redux Toolkit", "JWT", "Tailwind CSS"],
            link: "https://react-user-management-pi.vercel.app/login",
            github: "https://github.com/Moosabilal/ReactUserManagement"
        },
        {
            title: "Portfolio Website",
            desc: "The website you are currently viewing. High-performance, animated, and responsive personal portfolio.",
            tech: ["React", "Vite"],
            link: "#",
            github: "#"
        },
        {
            title: "React Todo App",
            desc: "A functional task manager demonstrating React state management (useState, useEffect). Features CRUD operations and LocalStorage persistence.",
            tech: ["React", "JavaScript", "CSS3"],
            link: "https://to-do-app-6yga.vercel.app/",
            github: "https://github.com/Moosabilal/ToDo_App"
        },
        {
            title: "Samsung Website Clone",
            desc: "A fully responsive replica of the Samsung homepage. Built using the Bootstrap 5 grid system and media queries for mobile-first design.",
            tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "Responsive Design"],
            link: "https://moosabilal.github.io/samsungmodel/",
            github: "https://github.com/Moosabilal/samsungmodel"
        },
        {
            title: "Instagram & Facebook UI Clones",
            desc: "Pixel-perfect recreations of social media interfaces. Focused on mastering CSS Flexbox, Grid layouts, and pure CSS styling.",
            tech: ["HTML5", "CSS3", "JavaScript"],
            link: {
                Instagram: "https://moosabilal.github.io/Instagram-clone/",
                Facebook: "https://moosabilal.github.io/facebook-clone/"
            },
            github: {
                Instagram: "https://github.com/Moosabilal/Instagram-clone",
                Facebook: "https://github.com/Moosabilal/facebook-clone"
            },
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 12 }
        }
    };

    return (
        <div
            className="section container"
            style={{ paddingTop: '150px' }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}
            >
                My <span className="gradient-text">Projects</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}
            >
                A selection of my recent work.
            </motion.p>

            <motion.div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        style={{
                            background: 'var(--bg-secondary)',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{
                            height: '200px',
                            background: `linear-gradient(45deg, var(--accent-primary), var(--bg-primary))`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.8
                        }}>
                            <span style={{ fontSize: '3rem', fontWeight: 'bold', opacity: 0.3 }}>{project.title[0]}</span>
                        </div>

                        <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{project.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', flex: 1 }}>{project.desc}</p>

                            {/* Tech Stack Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                                {project.tech.map((t, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.8rem',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        color: 'var(--accent-primary)',
                                        padding: '4px 10px',
                                        borderRadius: '20px'
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Dynamic Buttons Section */}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>

                                {/* 1. Handle GitHub Links */}
                                {typeof project.github === 'string' ? (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaGithub /> Code
                                    </a>
                                ) : (
                                    // Loop through the object (e.g., Instagram, Facebook)
                                    Object.entries(project.github).map(([label, url], index) => (
                                        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FaGithub /> {label}
                                        </a>
                                    ))
                                )}

                                {/* 2. Handle Live Demo Links */}
                                {typeof project.link === 'string' ? (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                        <FaExternalLinkAlt /> Demo
                                    </a>
                                ) : (
                                    // Loop through the object (e.g., Instagram, Facebook)
                                    Object.entries(project.link).map(([label, url], index) => (
                                        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                            <FaExternalLinkAlt /> {label}
                                        </a>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Projects;
