import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        // Import all images from the certificates directory
        const importAll = import.meta.glob('../assets/certificates/*.{png,jpg,jpeg,webp,svg}', { eager: true });
        
        const certs = Object.keys(importAll).map(path => {
            const fileName = path.split('/').pop();
            const nameLower = fileName.toLowerCase();
            
            // Auto-categorize based on filename
            let category = 'others';
            if (nameLower.includes('sport')) category = 'sports';
            else if (nameLower.includes('art')) category = 'arts';
            else if (nameLower.includes('intern') || nameLower.includes('experience')) category = 'internships';
            else if (nameLower.includes('edu') || nameLower.includes('degree') || nameLower.includes('school')) category = 'education';

            return {
                id: fileName,
                src: importAll[path].default,
                name: fileName.replace(/\.[^/.]+$/, ""), // Remove extension
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

    const filteredCertificates = activeTab === 'all' 
        ? certificates 
        : certificates.filter(cert => cert.category === activeTab);

    return (
        <div className="container mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    My <span className="gradient-text">Certificates</span>
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    A showcase of my achievements, participations, and learning experiences across various domains.
                </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                            activeTab === tab.id 
                            ? 'bg-accent-primary text-white shadow-lg' 
                            : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-white/5 hover:border-white/20'
                        }`}
                    >
                        {tab.label}
                        <span className="ml-2 text-xs opacity-70">
                            ({tab.id === 'all' ? certificates.length : certificates.filter(c => c.category === tab.id).length})
                        </span>
                    </button>
                ))}
            </div>

            {/* Gallery */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredCertificates.map((cert) => (
                        <motion.div
                            layout
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="group relative cursor-pointer aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-bg-secondary shadow-lg"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <img 
                                src={cert.src} 
                                alt={cert.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <h3 className="text-white font-medium truncate w-full" title={cert.name}>
                                    {cert.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredCertificates.length === 0 && (
                <div className="text-center py-20 text-text-secondary">
                    No certificates found in this category.
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedCert(null)}
                    >
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl"
                            onClick={() => setSelectedCert(null)}
                        >
                            &times;
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={selectedCert.src}
                            alt={selectedCert.name}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificates;
