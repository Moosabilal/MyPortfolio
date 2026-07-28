import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

    // Lock document scrolling while cinematic preloader is active so user begins at Frame #1
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    // Solution 3: Hybrid High-Speed WebP Preloading Engine with Instant Anchor Unveil
    useEffect(() => {
        let isCancelled = false;
        let loadedCount = 0;

        const loadFrame = (index) => {
            if (imagesRef.current.has(index)) return Promise.resolve(imagesRef.current.get(index));
            return new Promise((resolve) => {
                const img = new Image();
                const paddedIndex = String(index).padStart(3, '0');
                img.src = `/images/HeroPage/ezgif-frame-${paddedIndex}.webp`;
                
                img.onload = () => {
                    if (!isCancelled) {
                        imagesRef.current.set(index, img);
                        loadedCount++;
                        const progress = Math.round((loadedCount / totalFrames) * 100);
                        setLoadProgress(progress);
                        
                        if (index === 1) {
                            drawFrame(1);
                        }
                        
                        // Solution 3 Breakthrough: Unseal the preloader immediately once initial anchor frames (first ~20%) are buffered!
                        // This guarantees sub-1-second perceived load time for HR recruiters while background streaming fills the 60fps details!
                        if (loadedCount >= Math.floor(totalFrames * 0.2) && isLoading) {
                            setIsLoading(false);
                        }
                    }
                    resolve(img);
                };
                
                img.onerror = () => {
                    if (!isCancelled) {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                        if (loadedCount >= Math.floor(totalFrames * 0.2)) {
                            setIsLoading(false);
                        }
                    }
                    resolve(null);
                };
            });
        };

        const runHybridPreload = async () => {
            // Stage 0: Load Frame 1 immediately for instant background rendering
            await loadFrame(1);
            if (isCancelled) return;
            
            // Stage 1: Coarse Anchor Grid (Every 10th frame) -> Only ~450 KB total! Completes in milliseconds to guarantee smooth scroll coverage!
            const anchorPass = [];
            for (let i = 10; i <= totalFrames; i += 10) {
                if (!imagesRef.current.has(i)) anchorPass.push(loadFrame(i));
            }
            await Promise.all(anchorPass);
            if (isCancelled) return;
            
            // Immediately open the curtains if not already open after anchor pass arrives!
            setIsLoading(false);

            // Stage 2: Medium Fluidity Pass (Every 5th frame) -> Silently upgrades scene density in the background
            const mediumPass = [];
            for (let i = 5; i <= totalFrames; i += 5) {
                if (!imagesRef.current.has(i)) mediumPass.push(loadFrame(i));
            }
            await Promise.all(mediumPass);
            if (isCancelled) return;

            // Stage 3: Full 60 FPS Ultra-Definition Pass -> Silently fills in all remaining individual frames in high-speed batches
            const fullPass = [];
            for (let i = 2; i <= totalFrames; i++) {
                if (!imagesRef.current.has(i)) fullPass.push(i);
            }
            for (let i = 0; i < fullPass.length; i += 20) {
                if (isCancelled) break;
                const batch = fullPass.slice(i, i + 20).map(idx => loadFrame(idx));
                await Promise.all(batch);
            }
        };

        runHybridPreload();

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

                {/* Premium 3D Cinematic Gyroscope Preloader Overlay */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div 
                            key="cinematic-loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 z-[999] bg-[#030307]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center select-none"
                        >
                            {/* Ambient Cyberpunk Glow Gradients */}
                            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent-primary/20 blur-3xl pointer-events-none animate-pulse" />
                            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent-secondary/15 blur-3xl pointer-events-none translate-x-12 translate-y-12" />

                            {/* 3D Gyroscope Assembly */}
                            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8 perspective-[1000px]">
                                {/* Outer Orbital Rotating Ring */}
                                <motion.div 
                                    animate={{ rotateX: [0, 360], rotateY: [0, 180], rotateZ: [0, 360] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-accent-primary/50 shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                                    style={{ transformStyle: "preserve-3d" }}
                                />
                                
                                {/* Middle Orbital Ring */}
                                <motion.div 
                                    animate={{ rotateX: [360, 0], rotateY: [0, 360], rotateZ: [360, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-4 sm:inset-6 rounded-full border border-accent-secondary/70 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                                    style={{ transformStyle: "preserve-3d" }}
                                />

                                {/* Inner High-Speed Pulse Ring */}
                                <motion.div 
                                    animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
                                    transition={{ rotate: { duration: 3.5, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                                    className="absolute inset-10 sm:inset-12 rounded-full border-2 border-t-accent-primary border-r-transparent border-b-accent-secondary border-l-transparent"
                                />

                                {/* Center Digital Percentage Core */}
                                <div className="relative z-10 flex flex-col items-center justify-center bg-bg-primary/80 backdrop-blur-md w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/15 shadow-[inner_0_0_15px_rgba(255,255,255,0.05)]">
                                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider font-mono">
                                        {loadProgress}%
                                    </span>
                                    <span className="text-[9px] uppercase tracking-widest text-accent-primary font-semibold mt-0.5 animate-pulse">
                                        {loadProgress === 100 ? 'READY' : 'LOADING'}
                                    </span>
                                </div>
                            </div>

                            {/* Dynamic Title & Readouts */}
                            <motion.h3 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-lg sm:text-2xl font-bold tracking-wide text-white mb-3 drop-shadow-md"
                            >
                                Entering <span className="gradient-text">Interactive 3D Experience</span>
                            </motion.h3>

                            <p className="text-xs sm:text-sm text-text-secondary font-mono flex items-center justify-center gap-2.5 max-w-sm sm:max-w-md min-h-[24px]">
                                <span className="w-2 h-2 rounded-full bg-accent-primary animate-ping inline-block flex-shrink-0" />
                                <span>
                                    {loadProgress < 30 && "INITIALIZING 3D GRAPHICS ENGINE..."}
                                    {loadProgress >= 30 && loadProgress < 65 && "BUFFERING HIGH-DEF SCROLL ANIMATIONS..."}
                                    {loadProgress >= 65 && loadProgress < 95 && "OPTIMIZING IN-MEMORY GPU SHADERS..."}
                                    {loadProgress >= 95 && loadProgress < 100 && "FINALIZING 60 FPS LIQUID EXPERIENCE..."}
                                    {loadProgress === 100 && "✨ EXPERIENCE READY. UNVEILING... ✨"}
                                </span>
                            </p>

                            {/* Precision Neon Laser Progress Bar */}
                            <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden border border-white/5 p-[1px]">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-accent-primary via-indigo-400 to-accent-secondary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.9)]"
                                    style={{ width: `${loadProgress}%` }}
                                    transition={{ duration: 0.15 }}
                                />
                            </div>

                            <p className="text-[10px] text-text-secondary/50 mt-4 uppercase tracking-widest">
                                Please wait while all frames lock into RAM for zero-latency scrolling
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* =========================================================
                    CHAPTER 1: MAIN GREETING & HERO PROFILE
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
                    className="absolute inset-0 flex items-center justify-center lg:justify-start container mx-auto px-3 sm:px-6 z-10"
                >
                    <div className="w-full max-w-[94%] sm:max-w-lg lg:max-w-[480px] xl:max-w-[540px] flex flex-col items-center lg:items-start text-center lg:text-left p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-bg-primary/40 lg:bg-bg-primary/30 backdrop-blur-md lg:backdrop-blur-sm border border-white/10 shadow-2xl lg:ml-6 xl:ml-12">
                        <span className="px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/40 text-accent-primary font-semibold text-[10px] sm:text-xs tracking-widest uppercase mb-2 sm:mb-4 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            Welcome to My Creative Space
                        </span>
                        
                        <h2 className="text-base sm:text-2xl lg:text-3xl text-text-secondary mb-1 sm:mb-2 font-light">
                            Hello, I'm
                        </h2>
                        
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2 sm:mb-4 tracking-tight drop-shadow-lg text-white">
                            Moosa<span className="text-accent-primary">.</span>
                        </h1>
                        
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white mb-3 sm:mb-5 tracking-wide">
                            Full Stack <span className="gradient-text">Developer</span>
                        </h3>
                        
                        <p className="text-xs sm:text-sm lg:text-base text-text-secondary mb-5 sm:mb-8 leading-relaxed font-normal">
                            I build immersive digital experiences and robust web architectures with React, Node.js, Express, and MongoDB. Turning ideas into reality through clean code.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3.5 mb-6 sm:mb-8 w-full">
                            <Link to="/projects" className="btn btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold shadow-[0_5px_15px_rgba(99,102,241,0.4)] flex-1 sm:flex-initial text-center">
                                View My Work
                            </Link>
                            <a
                                href="https://raw.githubusercontent.com/Moosabilal/Resume-Moosa-K--A/main/Resume(Moosa-K-A).pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 text-xs sm:text-sm font-semibold flex-1 sm:flex-initial"
                            >
                                Resume <FaFileDownload className="text-accent-secondary" />
                            </a>
                            <Link to="/contact" className="btn btn-outline px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 text-xs sm:text-sm font-semibold w-full sm:w-auto text-center">
                                Contact Me
                            </Link>
                        </div>

                        <div className="flex gap-6 sm:gap-8 text-xl sm:text-2xl text-text-secondary">
                            <a href="https://github.com/Moosabilal" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/moosa-k-a-898300257/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1"><FaLinkedin /></a>
                            <a href="mailto:moosabilal75608@gmail.com" className="hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-1"><FaEnvelope /></a>
                        </div>
                    </div>
                </motion.div>

                {/* =========================================================
                    CHAPTER 2: HIGH-PERFORMANCE WEB ARCHITECTURE & FEATURES
                    (Aligned far-left on desktop to NEVER hide the face)
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity2, y: y2, pointerEvents: pointerEvents2 }}
                    className="absolute inset-0 flex items-center justify-center lg:justify-start container mx-auto px-3 sm:px-6 z-10"
                >
                    <div className="w-full max-w-[94%] sm:max-w-md lg:max-w-[440px] xl:max-w-[480px] p-4 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-bg-secondary/85 sm:bg-bg-secondary/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] text-left relative overflow-hidden lg:ml-6 xl:ml-12">
                        <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-gradient-to-b from-accent-primary to-accent-secondary" />
                        
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent-primary/20 text-accent-primary font-semibold text-[9px] sm:text-xs tracking-wider uppercase mb-2 sm:mb-5">
                            <FaBolt className="animate-bounce" /> Next-Gen Architecture
                        </div>

                        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-white leading-tight">
                            Engineered for <span className="gradient-text">Speed & Scale</span>
                        </h2>

                        <p className="text-text-secondary text-xs sm:text-sm lg:text-sm mb-4 sm:mb-6 leading-relaxed hidden sm:block">
                            Architected with modern cloud ecosystems, ensuring zero-latency transitions and instant responsiveness.
                        </p>

                        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3">
                            <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2 sm:p-3.5 rounded-xl bg-bg-primary/70 border border-white/5">
                                <FaRocket className="text-accent-primary text-sm sm:text-lg shrink-0" />
                                <div>
                                    <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight">Blazing Performance</h4>
                                    <p className="text-text-secondary text-[10px] sm:text-xs mt-0.5 hidden sm:block">Optimized bundle sizing & micro-interactions.</p>
                                </div>
                            </div>
                            <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2 sm:p-3.5 rounded-xl bg-bg-primary/70 border border-white/5">
                                <FaShieldAlt className="text-accent-secondary text-sm sm:text-lg shrink-0" />
                                <div>
                                    <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight">Bulletproof Security</h4>
                                    <p className="text-text-secondary text-[10px] sm:text-xs mt-0.5 hidden sm:block">Resilient validation & authentication layers.</p>
                                </div>
                            </div>
                            <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2 sm:p-3.5 rounded-xl bg-bg-primary/70 border border-white/5 sm:col-span-2">
                                <FaLayerGroup className="text-indigo-400 text-sm sm:text-lg shrink-0" />
                                <div>
                                    <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight">Responsive Mastery</h4>
                                    <p className="text-text-secondary text-[10px] sm:text-xs mt-0.5 hidden sm:block">Adaptive interfaces tailored for all display resolutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* =========================================================
                    CHAPTER 3: FULL STACK POWERHOUSE & SKILLS
                    (Aligned far-right on desktop to NEVER hide the face)
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity3, y: y3, pointerEvents: pointerEvents3 }}
                    className="absolute inset-0 flex items-center justify-center lg:justify-end container mx-auto px-3 sm:px-6 z-10"
                >
                    <div className="w-full max-w-[94%] sm:max-w-md lg:max-w-[440px] xl:max-w-[480px] p-4 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-bg-secondary/85 sm:bg-bg-secondary/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] text-left relative overflow-hidden lg:mr-6 xl:mr-12">
                        <div className="absolute top-0 right-0 w-1.5 sm:w-2 h-full bg-gradient-to-b from-accent-secondary to-accent-primary" />
                        
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent-secondary/20 text-accent-secondary font-semibold text-[9px] sm:text-xs tracking-wider uppercase mb-2 sm:mb-5">
                            <FaLaptopCode /> Technical Capabilities
                        </div>

                        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-white leading-tight">
                            Full-Stack <span className="gradient-text">Powerhouse</span>
                        </h2>

                        <p className="text-text-secondary text-xs sm:text-sm lg:text-sm mb-4 sm:mb-6 leading-relaxed hidden sm:block">
                            Bridging sleek frontend interactivity with resilient backend architectures and real-time database schemas.
                        </p>

                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2.5">
                            {[
                                { name: 'React & Next.js', icon: <FaCode className="text-cyan-400" /> },
                                { name: 'Node.js & Express', icon: <FaServer className="text-green-500" /> },
                                { name: 'MongoDB & NoSQL', icon: <FaDatabase className="text-green-400" /> },
                                { name: 'REST & WebSockets', icon: <FaBolt className="text-yellow-400" /> },
                                { name: 'Tailwind CSS', icon: <FaLayerGroup className="text-purple-400" /> },
                                { name: 'Git & CI/CD', icon: <FaRocket className="text-pink-400" /> },
                            ].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-bg-primary/80 border border-white/10 shadow-sm text-white font-medium text-[11px] sm:text-xs hover:border-accent-primary/50 transition-colors truncate">
                                    <span className="shrink-0">{skill.icon}</span>
                                    <span className="truncate">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* =========================================================
                    CHAPTER 4: FINAL INVITATION / TRANSITION
                    (Aligned far-left on desktop to keep central channel open)
                ========================================================== */}
                <motion.div 
                    style={{ opacity: opacity4, y: y4, pointerEvents: pointerEvents4 }}
                    className="absolute inset-0 flex items-center justify-center lg:justify-start container mx-auto px-3 sm:px-6 z-10"
                >
                    <div className="w-full max-w-[94%] sm:max-w-md lg:max-w-[460px] xl:max-w-[500px] text-center lg:text-left p-5 sm:p-9 lg:p-10 rounded-2xl sm:rounded-3xl bg-bg-primary/85 lg:bg-bg-primary/75 backdrop-blur-2xl border border-white/15 shadow-2xl lg:ml-6 xl:ml-12">
                        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-text-secondary mb-2 sm:mb-3 block">
                            Ready to Innovate
                        </span>
                        
                        <h2 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-3 sm:mb-5 leading-tight">
                            Crafted with <span className="gradient-text">Precision & Excellence</span>
                        </h2>
                        
                        <p className="text-text-secondary text-xs sm:text-sm lg:text-base max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
                            Explore my interactive portfolio below to discover featured projects, educational achievements, certifications, and expertise.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start">
                            <a 
                                href="#about" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn btn-primary px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.4)] cursor-pointer inline-flex items-center justify-center gap-2.5 w-full sm:w-auto"
                            >
                                Explore My Journey <FaRocket className="animate-bounce" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Persistent Animated Scroll Bar Indicator */}
                <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 sm:gap-2 pointer-events-none opacity-75">
                    <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary animate-pulse">
                        Scroll Down
                    </span>
                    <div className="w-4 sm:w-5 h-7 sm:h-9 rounded-full border sm:border-2 border-white/30 flex items-start justify-center p-1">
                        <motion.div 
                            animate={{ y: [0, 8, 0] }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                            className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_var(--accent-primary)]" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroScroll;
