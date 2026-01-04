import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B131E', // Warna Background Paling Belakang (Gelap)
        card: '#202B3B', // Warna Kotak-kotak (Lebih terang dikit)
        accent: '#0095FF', // Biru tombol "See more"
        textMain: '#FFFFFF',
        textDim: '#9399A2', // Teks abu-abu
      },
      borderRadius: {
        '4xl': '2rem', // Border radius lebih melengkung
      },
    },
  },
  plugins: [],
};

export default config;
