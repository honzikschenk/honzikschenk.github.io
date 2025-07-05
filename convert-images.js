import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(process.cwd(), 'public');
const outputDir = path.join(process.cwd(), 'public');

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png'];

// Configuration
const config = {
  webp: {
    quality: 85,
    effort: 6,
  },
  skipExisting: true,
  verbose: true,
};

async function getFileSizeInMB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024 / 1024).toFixed(2);
  } catch (error) {
    return 0;
  }
}

async function convertToWebP() {
  console.log('Starting image optimization...\n');
  
  try {
    const files = fs.readdirSync(inputDir);
    let totalOriginalSize = 0;
    let totalWebPSize = 0;
    let convertedCount = 0;
    let skippedCount = 0;
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const ext = path.extname(file).toLowerCase();
      
      if (supportedFormats.includes(ext)) {
        const outputPath = path.join(outputDir, file.replace(ext, '.webp'));
        
        // Skip if WebP already exists
        if (config.skipExisting && fs.existsSync(outputPath)) {
          if (config.verbose) {
            console.log(`Skipping ${file} -> WebP already exists`);
          }
          skippedCount++;
          continue;
        }
        
        try {
          const originalSize = await getFileSizeInMB(inputPath);
          
          // Process image with proper EXIF orientation handling
          const sharpInstance = sharp(inputPath);
          
          // Get metadata to check orientation
          const metadata = await sharpInstance.metadata();
          
          // Apply rotation only if EXIF orientation exists and is not 1 (normal)
          if (metadata.orientation && metadata.orientation !== 1) {
            await sharpInstance
              .rotate() // This auto-rotates based on EXIF data
              .webp(config.webp)
              .toFile(outputPath);
          } else {
            await sharpInstance
              .webp(config.webp)
              .toFile(outputPath);
          }
          
          const webpSize = await getFileSizeInMB(outputPath);
          const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
          
          totalOriginalSize += parseFloat(originalSize);
          totalWebPSize += parseFloat(webpSize);
          convertedCount++;
          
          if (config.verbose) {
            console.log(`✅ ${file} -> ${path.basename(outputPath)} (${originalSize}MB -> ${webpSize}MB, ${savings}% smaller)`);
          }
        } catch (error) {
          console.error(`❌ Failed to convert ${file}:`, error.message);
        }
      }
    }
    
    console.log('\nSummary:');
    console.log(`   Converted: ${convertedCount} images`);
    console.log(`   Skipped: ${skippedCount} images`);
    console.log(`   Total original size: ${totalOriginalSize.toFixed(2)} MB`);
    console.log(`   Total WebP size: ${totalWebPSize.toFixed(2)} MB`);
    
    if (totalOriginalSize > 0) {
      const totalSavings = ((totalOriginalSize - totalWebPSize) / totalOriginalSize * 100).toFixed(1);
      const sizeSaved = (totalOriginalSize - totalWebPSize).toFixed(2);
      console.log(`   Total savings: ${sizeSaved} MB (${totalSavings}% smaller)`);
    }
    
    console.log('\nImage optimization complete!');
    
    if (convertedCount > 0) {
      console.log('\nDon\'t forget to:');
      console.log('   1. Update image references in your components to use .webp extensions');
      console.log('   2. Test the optimized images in your browser');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

convertToWebP();
