import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: "QuickMate — Job Service Platform",
            desc: "On-demand service booking platform with real-time chat & video calls. Architected using the Repository Pattern and SOLID principles for scalability.",
            tech: ["MERN Stack", "TypeScript", "Socket.IO", "WebRTC", "AWS EC2", "JWT", "Redux", "Razorpay"],
            link: "https://quickmate.eagleswing.shop/",
            github: {
                frontend: "https://github.com/Moosabilal/Quickmate-frontend",
                backend: "https://github.com/Moosabilal/Quickmate-backend"
            }
        },
        {
            title: "Eagleswing — Fashion E-Commerce",
            desc: `High-performance B2C clothing store featuring Server-Side Rendering (SSR) for SEO. Includes secure Razorpay payments, wallet system, and inventory management. \n\nWait a little bit after opening - render takes 50 seconds to deploy free render server`,
            tech: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Razorpay"],
            link: "https://www.eagleswing.shop/",
            github: "https://github.com/Moosabilal/eCommerce"
        },
        {
            title: "User Management System",
            desc: "A secure admin dashboard featuring JWT authentication, Redux Toolkit for global state management, and full CRUD operations. \n\nWait a little bit after opening - render takes 50 seconds to deploy free render server",
            tech: ["MERN Stack", "Redux Toolkit", "JWT", "Tailwind CSS"],
            link: "https://react-user-management-pi.vercel.app/login",
            github: "https://github.com/Moosabilal/ReactUserManagement"
        },
        {
            title: "Portfolio Website",
            desc: "The website you are currently viewing. High-performance, animated, and responsive personal portfolio.",
            tech: ["React", "Vite"],
            link: "https://my-portfolio-eight-delta-akilc77lz3.vercel.app/",
            github: "https://github.com/Moosabilal/MyPortfolio"
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
            className="section container pt-[150px]"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl mb-4 text-center"
            >
                My <span className="gradient-text">Projects</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-text-secondary mb-16"
            >
                A selection of my recent work.
            </motion.p>

            <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8"
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
                        className="bg-bg-secondary rounded-[15px] overflow-hidden border border-white/5 flex flex-col shadow-lg"
                    >
                        <div className="h-[200px] bg-gradient-to-tr from-accent-primary to-bg-primary flex items-center justify-center opacity-80">
                            <span className="text-5xl font-bold opacity-30">{project.title[0]}</span>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-2xl mb-2.5">{project.title}</h3>
                            <p className="text-text-secondary mb-5 flex-1 whitespace-pre-line">{project.desc}</p>

                            <div className="flex flex-wrap gap-2.5 mb-5">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-xs bg-accent-primary/10 text-accent-primary px-2.5 py-1 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2.5 flex-wrap mt-auto">

                                {typeof project.github === 'string' ? (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                                        <FaGithub /> Code
                                    </a>
                                ) : (
                                    Object.entries(project.github).map(([label, url], index) => (
                                        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                                            <FaGithub /> {label}
                                        </a>
                                    ))
                                )}

                                {typeof project.link === 'string' ? (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 text-sm flex items-center gap-2 no-underline">
                                        <FaExternalLinkAlt /> Demo
                                    </a>
                                ) : (
                                    Object.entries(project.link).map(([label, url], index) => (
                                        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 text-sm flex items-center gap-2 no-underline">
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
