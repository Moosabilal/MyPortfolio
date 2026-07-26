import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaBolt, FaLayerGroup, FaCode, FaServer, FaDatabase, FaShieldAlt, FaRocket, FaLaptopCode } from 'react-icons/fa';

const HeroScroll = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef(new Map());
    const currentFrameRef = useRef(1);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const totalFrames = 230;

    const drawFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Try to get exact frame, if not loaded yet, find closest available frame in cache
        let img = imagesRef.current.get(index);
        if (!img) {
            for (let offset = 1; offset < totalFrames; offset++) {
                if (imagesRef.current.has(index - offset)) {
                    img = imagesRef.current.get(index - offset);
                    break;
                }
                if (imagesRef.current.has(index + offset)) {
                    img = imagesRef.current.get(index + offset);
                    break;
                }
            }
        }

        if (!img) return;
        currentFrameRef.current = index;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        
        const rect = canvas.parentElement.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Aspect-ratio preserving cover calculation
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = width / imgRatio;
            offsetY = (height - drawHeight) / 2;
        } else {
            drawWidth = height * imgRatio;
            offsetX = (width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
    };

    // Preload image frames with concurrency control
    useEffect(() => {
        let isCancelled = false;
        let loadedCount = 0;

        const loadFrame = (index) => {
            return new Promise((resolve) => {
                const img = new Image();
                const paddedIndex = String(index).padStart(3, '0');
                img.src = `/images/HeroPage/ezgif-frame-${paddedIndex}.png`;
                
                img.onload = () => {
                    if (!isCancelled) {
                        imagesRef.current.set(index, img);
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                        if (index === 1) {
                            drawFrame(1);
                            setIsLoading(false);
                        }
                    }
                    resolve(img);
                };
                
                img.onerror = () => {
                    if (!isCancelled) {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                    }
                    resolve(null);
                };
            });
        };

        const runPreload = async () => {
            // Load initial frame immediately for zero-lag render
            await loadFrame(1);
            
            // Load remaining frames in batches of 6 for high speed & low overhead
            for (let i = 2; i <= totalFrames; i += 6) {
                if (isCancelled) break;
                const batch = [];
                for (let j = 0; j < 6 && (i + j) <= totalFrames; j++) {
                    batch.push(loadFrame(i + j));
                }
                await Promise.all(batch);
            }
        };

        runPreload();

        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            isCancelled = true;
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Track scroll progress along the 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            const frameIndex = Math.min(totalFrames, Math.max(1, Math.round(latest * (totalFrames - 1)) + 1));
            drawFrame(frameIndex);
        });
    }, [scrollYProgress]);

    // Scroll-linked cinematic transitions for chapters
    // Chapter 1: Introduction (0.0 - 0.22)
    const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.23], [1, 1, 0, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -50]);
    const pointerEvents1 = useTransform(scrollYProgress, (val) => val < 0.20 ? "auto" : "none");

    // Chapter 2: Modern Architecture & Performance (0.22 - 0.46)
    const opacity2 = useTransform(scrollYProgress, [0.18, 0.25, 0.38, 0.45], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.18, 0.25, 0.38, 0.45], [50, 0, 0, -50]);
    const pointerEvents2 = useTransform(scrollYProgress, (val) => val >= 0.20 && val < 0.43 ? "auto" : "none");

    // Chapter 3: Full-Stack Powerhouse & Deep Skills (0.44 - 0.70)
    const opacity3 = useTransform(scrollYProgress, [0.40, 0.48, 0.62, 0.70], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.40, 0.48, 0.62, 0.70], [50, 0, 0, -50]);
    const pointerEvents3 = useTransform(scrollYProgress, (val) => val >= 0.43 && val < 0.68 ? "auto" : "none");

    // Chapter 4: Vision & Call to Action (0.68 - 1.0)
    const opacity4 = useTransform(scrollYProgress, [0.65, 0.75, 0.95, 1], [0, 1, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.65, 0.75, 0.95, 1], [50, 0, 0, 0]);
    const pointerEvents4 = useTransform(scrollYProgress, (val) => val >= 0.68 ? "auto" : "none");

    return (
        <section id="home" ref={containerRef} className="relative w-full h-[500vh] bg-bg-primary">
            {/* Sticky Canvas & Overlays */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
                {/* Canvas Background */}
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-95 contrast-105 transition-all duration-300" 
                />

                {/* Ambient Radial Vignette & Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/20 to-bg-primary/90 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--bg-primary)_100%)] opacity-70 pointer-events-none" />

                {/* Loading Banner for initial background cache */}
                {isLoading && (
                    <div className="absolute top-24 right-6 z-50 bg-bg-secondary/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs text-text-secondary flex items-center gap-2 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
                        Initializing 3D Visual Engine... {loadProgress}%
                    </div>
                )}

                {/* =========================================================
                    CHAPTER 1: MAIN GREETING & HERO PROFILE
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
                    className="absolute inset-0 flex items-center justify-center container mx-auto px-6 z-10"
                >
                    <div className="w-full max-w-3xl flex flex-col items-center text-center p-6 md:p-10 rounded-3xl bg-bg-primary/30 backdrop-blur-sm border border-white/5 shadow-2xl">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/40 text-accent-primary font-semibold text-xs md:text-sm tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            Welcome to My Creative Space
                        </span>
                        
                        <h2 className="text-2xl md:text-3xl text-text-secondary mb-2 font-light">
                            Hello, I'm
                        </h2>
                        
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight mb-4 tracking-tight drop-shadow-lg">
                            Moosa<span className="text-accent-primary">.</span>
                        </h1>
                        
                        <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-6 tracking-wide">
                            Full Stack <span className="gradient-text">Developer</span>
                        </h3>
                        
                        <p className="text-base md:text-lg text-text-secondary mb-8 max-w-[600px] leading-relaxed font-normal">
                            I build immersive digital experiences and robust web architectures with React, Node.js, Express, and MongoDB. Turning complex ideas into reality through elegant code.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Link to="/projects" className="btn btn-primary px-7 py-3.5 rounded-xl text-base shadow-[0_10px_25px_rgba(99,102,241,0.4)]">
                                View My Work
                            </Link>
                            <a
                                href="https://raw.githubusercontent.com/Moosabilal/Resume-Moosa-K--A/main/Resume(Moosa-K-A).pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10"
                            >
                                Resume <FaFileDownload className="text-accent-secondary" />
                            </a>
                            <Link to="/contact" className="btn btn-outline px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10">
                                Contact Me
                            </Link>
                        </div>

                        <div className="flex gap-8 text-2xl text-text-secondary">
                            <a href="https://github.com/Moosabilal" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1 scale-110"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1 scale-110"><FaLinkedin /></a>
                            <a href="mailto:moosabilal75608@gmail.com" className="hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1 scale-110"><FaEnvelope /></a>
                        </div>
                    </div>
                </motion.div>

                {/* =========================================================
                    CHAPTER 2: HIGH-PERFORMANCE WEB ARCHITECTURE & FEATURES
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity2, y: y2, pointerEvents: pointerEvents2 }}
                    className="absolute inset-0 flex items-center justify-start container mx-auto px-6 z-10"
                >
                    <div className="w-full max-w-2xl p-8 md:p-12 rounded-3xl bg-bg-secondary/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-left relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-accent-primary to-accent-secondary" />
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary font-semibold text-xs tracking-wider uppercase mb-6">
                            <FaBolt className="animate-bounce" /> Next-Gen Architecture
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Engineered for <span className="gradient-text">Speed & Scale</span>
                        </h2>

                        <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
                            Every digital product is architected with modern cloud ecosystem best practices, ensuring instant responsiveness, seamless view transitions, and zero-latency interactions.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-primary/60 border border-white/5">
                                <FaRocket className="text-accent-primary text-xl mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-white font-semibold text-sm">Blazing Performance</h4>
                                    <p className="text-text-secondary text-xs mt-1">Optimized bundle sizing, SSR & instant micro-interactions.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-primary/60 border border-white/5">
                                <FaShieldAlt className="text-accent-secondary text-xl mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-white font-semibold text-sm">Bulletproof Security</h4>
                                    <p className="text-text-secondary text-xs mt-1">Modern authentication, CORS, and resilient validation layers.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-primary/60 border border-white/5 sm:col-span-2">
                                <FaLayerGroup className="text-indigo-400 text-xl mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-white font-semibold text-sm">Responsive Design Mastery</h4>
                                    <p className="text-text-secondary text-xs mt-1">Fluid typography and adaptive interfaces tailored for every screen size and orientation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* =========================================================
                    CHAPTER 3: FULL STACK POWERHOUSE & SKILLS
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity3, y: y3, pointerEvents: pointerEvents3 }}
                    className="absolute inset-0 flex items-center justify-end container mx-auto px-6 z-10"
                >
                    <div className="w-full max-w-2xl p-8 md:p-12 rounded-3xl bg-bg-secondary/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-accent-secondary to-accent-primary" />
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/20 text-accent-secondary font-semibold text-xs tracking-wider uppercase mb-6">
                            <FaLaptopCode /> Technical Capabilities
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Full-Stack <span className="gradient-text">Powerhouse</span>
                        </h2>

                        <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
                            Bridging sleek frontend interactive design with high-concurrency backend infrastructures. Experienced in designing RESTful APIs and real-time database schemas.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {[
                                { name: 'React & Next.js', icon: <FaCode className="text-cyan-400" /> },
                                { name: 'Node.js & Express', icon: <FaServer className="text-green-500" /> },
                                { name: 'MongoDB & NoSQL', icon: <FaDatabase className="text-green-400" /> },
                                { name: 'RESTful & WebSockets', icon: <FaBolt className="text-yellow-400" /> },
                                { name: 'Vanilla CSS & Tailwind', icon: <FaLayerGroup className="text-purple-400" /> },
                                { name: 'Git & Cloud CI/CD', icon: <FaRocket className="text-pink-400" /> },
                            ].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-bg-primary/80 border border-white/10 shadow-md text-white font-medium text-sm hover:border-accent-primary/50 transition-colors">
                                    {skill.icon}
                                    <span>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* =========================================================
                    CHAPTER 4: FINAL INVITATION / TRANSITION
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity4, y: y4, pointerEvents: pointerEvents4 }}
                    className="absolute inset-0 flex items-center justify-center container mx-auto px-6 z-10"
                >
                    <div className="w-full max-w-3xl text-center p-8 md:p-14 rounded-3xl bg-bg-primary/80 backdrop-blur-2xl border border-white/15 shadow-2xl">
                        <span className="text-xs uppercase font-bold tracking-widest text-text-secondary mb-3 block">
                            Ready to Innovate
                        </span>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Crafted with <span className="gradient-text">Precision & Excellence</span>
                        </h2>
                        
                        <p className="text-text-secondary text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                            Explore my portfolio below to discover deep dives into my featured projects, educational achievements, certifications, and technical mastery.
                        </p>

                        <div className="flex flex-wrap justify-center gap-5">
                            <a 
                                href="#about" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn btn-primary px-8 py-4 text-lg rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.4)] cursor-pointer inline-flex items-center gap-3"
                            >
                                Explore My Journey <FaRocket className="animate-bounce" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Persistent Animated Scroll Bar Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-70">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary animate-pulse">
                        Scroll Down to Experience
                    </span>
                    <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                        <motion.div 
                            animate={{ y: [0, 12, 0] }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                            className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_var(--accent-primary)]" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroScroll;
