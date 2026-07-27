import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsDir = path.resolve(__dirname, '../src/assets/certificates');

console.log('🔍 Scanning certificates folder for PDF files without JPG thumbnails...\n');

try {
    if (!fs.existsSync(certsDir)) {
        console.error(`❌ Directory not found: ${certsDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(certsDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
    
    let convertedCount = 0;
    
    for (const pdf of pdfFiles) {
        const baseName = pdf.replace(/\.pdf$/i, '');
        const pdfPath = path.join(certsDir, pdf);
        const jpgPath = path.join(certsDir, `${baseName}.jpg`);
        
        // If JPG already exists, skip
        if (fs.existsSync(jpgPath)) {
            continue;
        }

        console.log(`🚀 Found new PDF: "${pdf}" -> Generating cover thumbnail...`);
        
        // Run pdftoppm to generate high-res JPG
        const outputPrefix = path.join(certsDir, baseName);
        execSync(`pdftoppm -jpeg -r 200 "${pdfPath}" "${outputPrefix}"`, { stdio: 'inherit' });
        
        // pdftoppm appends -1.jpg or -01.jpg by default for single/first page
        const candidate1 = path.join(certsDir, `${baseName}-1.jpg`);
        const candidate01 = path.join(certsDir, `${baseName}-01.jpg`);
        
        if (fs.existsSync(candidate1)) {
            fs.renameSync(candidate1, jpgPath);
        } else if (fs.existsSync(candidate01)) {
            fs.renameSync(candidate01, jpgPath);
        }
        
        // Clean up any extra pages if it was a multi-page PDF document
        const allNewFiles = fs.readdirSync(certsDir);
        allNewFiles.forEach(f => {
            if (f !== `${baseName}.jpg` && f.startsWith(`${baseName}-`) && f.endsWith('.jpg')) {
                fs.unlinkSync(path.join(certsDir, f));
            }
        });

        console.log(`✅ Successfully created cover thumbnail: ${baseName}.jpg\n`);
        convertedCount++;
    }
    
    if (convertedCount === 0) {
        console.log('✨ All PDF certificates already have matching JPG thumbnails! Up to date.');
    } else {
        console.log(`🎉 Successfully generated cover thumbnails for ${convertedCount} new PDF certificate(s)!`);
    }
} catch (error) {
    console.error('❌ Error generating thumbnails:', error.message);
    process.exit(1);
}
