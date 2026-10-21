import sharp from 'sharp';
import fs from 'node:fs';

const inputPath = 'C:\\Users\\user\\.gemini\\antigravity-ide\\brain\\ef784532-8baa-44bc-8e11-4a8384b40417\\.user_uploaded\\media_1792579332785.jpg';

async function processLogo() {
  console.log('Loading input logo...');
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  const outputData = Buffer.alloc(width * height * 4);

  // We want to remove the white background cleanly.
  // The background is pure white [255, 255, 255].
  // The logo is a vibrant blue/indigo gradient:
  // Red is low (around 30-60), Green is medium (around 70-150), Blue is high (around 200-245).
  // Near the edges, pixels are anti-aliased with white.
  // True alpha can be computed based on distance from white:
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels + 0];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    // Distance from white:
    const diffR = 255 - r;
    const diffG = 255 - g;
    const diffB = 255 - b;
    const maxDiff = Math.max(diffR, diffG); // Blue is brightest, so R and G deviate most from white

    let alpha = 0;
    if (maxDiff <= 4) {
      alpha = 0; // Pure white background
    } else if (maxDiff < 30) {
      // Soft transition edge
      alpha = (maxDiff - 4) / 26;
    } else {
      alpha = 1.0;
    }

    if (alpha <= 0) {
      outputData[i * 4 + 0] = 0;
      outputData[i * 4 + 1] = 0;
      outputData[i * 4 + 2] = 0;
      outputData[i * 4 + 3] = 0;
    } else if (alpha >= 1.0) {
      outputData[i * 4 + 0] = r;
      outputData[i * 4 + 1] = g;
      outputData[i * 4 + 2] = b;
      outputData[i * 4 + 3] = 255;
    } else {
      // Un-multiply white background: (c - (1 - alpha) * 255) / alpha
      const unR = Math.max(0, Math.min(255, Math.round((r - (1 - alpha) * 255) / alpha)));
      const unG = Math.max(0, Math.min(255, Math.round((g - (1 - alpha) * 255) / alpha)));
      const unB = Math.max(0, Math.min(255, Math.round((b - (1 - alpha) * 255) / alpha)));

      outputData[i * 4 + 0] = unR;
      outputData[i * 4 + 1] = unG;
      outputData[i * 4 + 2] = unB;
      outputData[i * 4 + 3] = Math.round(alpha * 255);
    }
  }

  // Create trimmed transparent version
  console.log('Generating trimmed transparent PNG...');
  const trimmed = await sharp(outputData, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 5 })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync('public/brands/steps-original.png', trimmed);
  fs.writeFileSync('public/brands/steps-mark.png', trimmed);
  console.log('Saved transparent logo to public/brands/steps-original.png and steps-mark.png');

  // Also save a trimmed version with white background for places that specifically need a white canvas
  const trimmedWhite = await sharp(inputPath)
    .trim({ threshold: 10 })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync('public/brands/steps-white-bg.png', trimmedWhite);
  console.log('Saved white-bg logo to public/brands/steps-white-bg.png');
}

processLogo().catch(console.error);
