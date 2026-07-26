import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaExternalLinkAlt, FaDownload, FaTimes, FaSearchPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedCert, setSelectedCert] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);

    const formatTitle = (rawName) => {
        // Strip file extension
        let clean = rawName.replace(/\.[^/.]+$/, "");
        // Strip category keyword suffixes like _edu, _art, _sport, _intern
        clean = clean.replace(/_(edu|art|sport|intern|experience|others?)$/i, "");
        // Replace underscores and hyphens with spaces and trim
        clean = clean.replace(/[_-]+/g, " ").trim();
        // Capitalize each word cleanly
        return clean.replace(/\b\w/g, c => c.toUpperCase());
    };

    useEffect(() => {
        // Import all image thumbnails and PDF original documents from the certificates directory
        const importImages = import.meta.glob('../assets/certificates/*.{png,jpg,jpeg,webp,svg}', { eager: true });
        const importPdfs = import.meta.glob('../assets/certificates/*.pdf', { eager: true });
        
        const certs = Object.keys(importImages).map(path => {
            const fileName = path.split('/').pop();
            const baseName = fileName.replace(/\.[^/.]+$/, "");
            const nameLower = fileName.toLowerCase();
            
            // Check if a corresponding original PDF exists for this image thumbnail
            const pdfPath = path.replace(/\.[^/.]+$/, '.pdf');
            const pdfSrc = importPdfs[pdfPath]?.default || null;
            
            // Auto-categorize based on filename keywords
            let category = 'others';
            if (nameLower.includes('sport')) category = 'sports';
            else if (nameLower.includes('art')) category = 'arts';
            else if (nameLower.includes('intern') || nameLower.includes('experience')) category = 'internships';
            else if (nameLower.includes('edu') || nameLower.includes('degree') || nameLower.includes('semester') || nameLower.includes('school')) category = 'education';

            return {
                id: fileName,
                src: importImages[path].default,
                pdfSrc,
                rawName: baseName,
                name: formatTitle(baseName),
                category
            };
        });
        
        setCertificates(certs);
    }, []);

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'sports', label: 'Sports' },
        { id: 'arts', label: 'Arts' },
        { id: 'internships', label: 'Internships' },
        { id: 'education', label: 'Education' },
        { id: 'others', label: 'Others' }
    ];

    const allFilteredCertificates = activeTab === 'all' 
        ? certificates 
        : certificates.filter(cert => cert.category === activeTab);

    const displayedCertificates = allFilteredCertificates.slice(0, visibleCount);
    const remainingCount = allFilteredCertificates.length - visibleCount;

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setVisibleCount(12); // Reset back to initial neat view when changing tabs
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10 sm:mb-12"
            >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
                    My <span className="gradient-text">Certificates & Credentials</span>
                </h2>
                <p className="text-text-secondary text-xs sm:text-base max-w-2xl mx-auto px-2">
                    A curated showcase of my degrees, technical certifications, sports recognitions, and educational achievements. Tap any certificate to explore and verify official documents.
                </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-8 sm:mb-12">
                {tabs.map(tab => {
                    const tabCount = tab.id === 'all' ? certificates.length : certificates.filter(c => c.category === tab.id).length;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                                activeTab === tab.id 
                                ? 'bg-accent-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                                : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-white/5 hover:border-white/20'
                            }`}
                        >
                            {tab.label}
                            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs opacity-70">
                                ({tabCount})
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Gallery Grid: 2 columns on mobile (320px+), scaling cleanly up to 4 columns */}
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                <AnimatePresence>
                    {displayedCertificates.map((cert) => (
                        <motion.div
                            layout
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25 }}
                            className="group relative cursor-pointer aspect-[4/3] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-bg-secondary shadow-md hover:border-accent-primary/40 transition-all duration-300 sm:hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.3)] flex flex-col justify-end"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <img 
                                src={cert.src} 
                                alt={cert.name} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter group-hover:brightness-90"
                            />

                            {/* PDF Badge in Corner */}
                            {cert.pdfSrc && (
                                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center gap-1 text-[9px] sm:text-[11px] font-semibold text-accent-primary shadow-md">
                                    <FaFilePdf className="text-red-400 text-[10px] sm:text-xs" />
                                    <span className="hidden sm:inline">Verified PDF</span>
                                    <span className="sm:hidden">PDF</span>
                                </div>
                            )}

                            {/* Title & Info Bar: Always legible on mobile touch screens, deepens on hover */}
                            <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2 sm:p-4 pt-6 sm:pt-10 flex flex-col justify-end">
                                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-accent-secondary mb-0.5 hidden sm:block">
                                    {cert.category}
                                </span>
                                <h3 className="text-white font-semibold text-xs sm:text-base leading-tight sm:leading-snug truncate w-full" title={cert.name}>
                                    {cert.name}
                                </h3>
                                <span className="text-[9px] sm:text-[11px] text-text-secondary mt-0.5 sm:mt-1 flex items-center gap-1 opacity-80 sm:opacity-100 sm:hidden group-hover:sm:flex">
                                    <FaSearchPlus className="text-[9px] sm:text-xs text-accent-primary" /> 
                                    <span className="hidden sm:inline">Click to view credentials</span>
                                    <span className="sm:hidden text-[9px]">Tap to view</span>
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {allFilteredCertificates.length === 0 && (
                <div className="text-center py-16 text-text-secondary border border-dashed border-white/10 rounded-2xl max-w-lg mx-auto text-xs sm:text-base">
                    No certificates currently listed in the <span className="text-white font-medium">{activeTab}</span> category.
                </div>
            )}

            {/* Progressive "Load More" Pagination Section */}
            {remainingCount > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 sm:mt-14 text-center flex flex-col items-center gap-2"
                >
                    <button
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="btn btn-primary px-6 py-3 sm:px-8 sm:py-3.5 rounded-full flex items-center gap-2 font-semibold shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] transform hover:-translate-y-0.5 transition-all text-xs sm:text-base cursor-pointer"
                    >
                        <span>✨ Load More Achievements</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] sm:text-xs text-white font-bold">
                            +{Math.min(remainingCount, 12)}
                        </span>
                    </button>
                    <p className="text-text-secondary text-[11px] sm:text-xs opacity-75 mt-0.5">
                        Showing <span className="text-white font-medium">{displayedCertificates.length}</span> of <span className="text-white font-medium">{allFilteredCertificates.length}</span> achievements
                    </p>
                </motion.div>
            )}

            {/* "Show Less" Collapse Button when fully expanded */}
            {allFilteredCertificates.length > 12 && remainingCount <= 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 sm:mt-14 text-center">
                    <button
                        onClick={() => setVisibleCount(12)}
                        className="btn btn-outline px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 bg-bg-secondary hover:bg-white/10 text-text-secondary hover:text-white transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                    >
                        <FaChevronUp className="text-[10px]" /> Show Less & Collapse
                    </button>
                </motion.div>
            )}

            {/* Expanded Lightbox Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 md:p-10"
                        onClick={() => setSelectedCert(null)}
                    >
                        {/* Top Header Bar */}
                        <div className="w-full max-w-5xl flex items-center justify-between mb-4 z-10 text-white px-2" onClick={(e) => e.stopPropagation()}>
                            <div>
                                <span className="text-[10px] sm:text-xs text-accent-primary uppercase tracking-widest font-semibold block">
                                    {selectedCert.category} Credential
                                </span>
                                <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                                    {selectedCert.name}
                                    {selectedCert.pdfSrc && <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 font-semibold uppercase tracking-wider">PDF Verified</span>}
                                </h3>
                            </div>
                            <button 
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-base sm:text-lg transition-colors cursor-pointer shrink-0 ml-3"
                                onClick={() => setSelectedCert(null)}
                                aria-label="Close modal"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Image Showcase */}
                        <motion.div 
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            className="relative max-w-5xl max-h-[70vh] w-full flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/15 bg-bg-secondary/60 p-1 sm:p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedCert.src}
                                alt={selectedCert.name}
                                className="max-w-full max-h-[66vh] object-contain rounded-lg sm:rounded-xl"
                            />
                        </motion.div>

                        {/* Interactive Action Bar */}
                        <div className="w-full max-w-5xl flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-3 mt-4 z-10 px-2" onClick={(e) => e.stopPropagation()}>
                            <div className="text-[11px] text-text-secondary hidden md:block mr-auto">
                                Press ESC or click outside to close preview
                            </div>
                            
                            {selectedCert.pdfSrc ? (
                                <>
                                    <a
                                        href={selectedCert.pdfSrc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex-1 sm:flex-initial"
                                    >
                                        <FaFilePdf className="text-sm sm:text-base text-white" /> Open Full PDF <FaExternalLinkAlt className="text-[9px] sm:text-[10px] ml-0.5 opacity-80" />
                                    </a>
                                    <a
                                        href={selectedCert.pdfSrc}
                                        download
                                        className="btn btn-outline px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all flex-1 sm:flex-initial"
                                    >
                                        <FaDownload className="text-accent-secondary" /> Download PDF
                                    </a>
                                </>
                            ) : null}

                            <a
                                href={selectedCert.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium border border-white/15 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-all w-full sm:w-auto mt-1 sm:mt-0"
                            >
                                <FaSearchPlus /> View Image Only
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificates;
