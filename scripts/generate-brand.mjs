import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const source = process.env.VENDETO_LOGOS_DIR ?? 'C:/Dev/PosWeb2/Logos';
const input = (name) => join(source, name);
const colorWordmark = input('Logo vendeto vectorizado sin fondo color_Mesa de trabajo 1.png');
const whiteWordmark = input('Logo vendeto vectorizado blanco sin fondo-03.png');
const colorIcon = input('favicon sin fondo color-04.png');
const whiteIcon = input('Logo vendeto vectorizado favicon blanco sin fondo-06.png');

await mkdir('src/assets/brand', { recursive: true });
await sharp(colorWordmark).trim().resize({ height: 96 }).png().toFile('src/assets/brand/wordmark-color.png');
await sharp(whiteWordmark).trim().resize({ height: 96 }).png().toFile('src/assets/brand/wordmark-white.png');
await sharp(colorIcon).trim().resize(32, 32, { fit: 'contain' }).png().toFile('public/favicon-32.png');
await sharp(colorIcon).trim().resize(180, 180, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');
await sharp(colorIcon).trim().resize(512, 512, { fit: 'contain' }).png().toFile('public/icon-512.png');
const icon = await sharp(whiteIcon).trim().resize({ height: 280 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#041433' } })
  .composite([{ input: icon, gravity: 'centre' }]).png().toFile('public/og-image.png');
