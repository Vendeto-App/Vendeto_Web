import type { ImageMetadata } from 'astro';
import post1 from '../assets/instagram/post-1.jpg';
import post2 from '../assets/instagram/post-2.jpg';
import post3 from '../assets/instagram/post-3.jpg';
import post4 from '../assets/instagram/post-4.jpg';

export const INSTAGRAM_PROFILE = 'https://www.instagram.com/vendetoapp/';

export const instagramPosts = [
  { image: post1, alt: 'Hay una forma mucho más simple de controlar ventas, stock y caja' },
  { image: post2, alt: 'La gestión simple para tu negocio' },
  { image: post3, alt: 'Nació de una necesidad real' },
  { image: post4, alt: 'Vendeto existe para que ningún comerciante tenga que depender de un cuaderno para saber qué stock le queda y cuánto le deben' },
] as { image: ImageMetadata; alt: string; href?: string }[];
