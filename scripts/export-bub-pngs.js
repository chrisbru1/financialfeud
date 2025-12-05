import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '../src/assets/brand/BubMoneyTongue.svg');
const outputDir = join(__dirname, '../src/assets/brand');

const svgBuffer = readFileSync(svgPath);

// Base dimensions from SVG viewBox (300x280)
const baseWidth = 300;
const baseHeight = 280;

// Generate @2x (600x560)
sharp(svgBuffer)
  .resize(baseWidth * 2, baseHeight * 2)
  .png()
  .toFile(join(outputDir, 'BubMoneyTongue@2x.png'))
  .then(() => console.log('✓ Created BubMoneyTongue@2x.png'))
  .catch(err => console.error('Error creating @2x:', err));

// Generate @4x (1200x1120)
sharp(svgBuffer)
  .resize(baseWidth * 4, baseHeight * 4)
  .png()
  .toFile(join(outputDir, 'BubMoneyTongue@4x.png'))
  .then(() => console.log('✓ Created BubMoneyTongue@4x.png'))
  .catch(err => console.error('Error creating @4x:', err));

// Also create a 1x version for reference
sharp(svgBuffer)
  .resize(baseWidth, baseHeight)
  .png()
  .toFile(join(outputDir, 'BubMoneyTongue.png'))
  .then(() => console.log('✓ Created BubMoneyTongue.png'))
  .catch(err => console.error('Error creating 1x:', err));

