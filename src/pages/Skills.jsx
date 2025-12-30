import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaAws } from "react-icons/fa";
import { SiTypescript, SiExpress, SiMongodb, SiTailwindcss, SiBootstrap, SiSocketdotio, SiNginx, SiPostman, SiFigma, SiMysql, SiPostgresql } from "react-icons/si";

const Skills = () => {
    const skills = [
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },

        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952B3" },

        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express", icon: <SiExpress />, color: "var(--text-primary)" },
        { name: "Socket.IO", icon: <SiSocketdotio />, color: "var(--text-primary)" },

        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },

        { name: "AWS", icon: <FaAws />, color: "#FF9900" },
        { name: "Nginx", icon: <SiNginx />, color: "#009639" },
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
        { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.8 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 10 }
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
                style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}
            >
                Technical <span className="gradient-text">Skills</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}
            >
                The technologies I use to build amazing things.
            </motion.p>

            <motion.div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '30px',
                    justifyItems: 'center'
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, y: -10, transition: { type: "spring", stiffness: 300 } }}
                        style={{
                            width: '150px',
                            height: '150px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ fontSize: '4rem', color: skill.color, marginBottom: '10px' }}>
                            {skill.icon}
                        </div>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{skill.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Skills;
