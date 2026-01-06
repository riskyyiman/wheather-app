import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SkyCast — Weather Forecast & Live Conditions',
    template: '%s | SkyCast',
  },
  description: 'SkyCast adalah aplikasi cuaca modern dengan prakiraan harian, mingguan, peta interaktif, dan kondisi udara real-time.',
  applicationName: 'SkyCast',
  keywords: ['weather app', 'weather forecast', 'prakiraan cuaca', 'cuaca hari ini', 'weather map', 'air quality'],
  authors: [{ name: 'SkyCast Team' }],
  creator: 'SkyCast',
  metadataBase: new URL('https://your-domain.com'),

  // Open Graph (Preview saat dibagikan)
  openGraph: {
    title: 'SkyCast — Weather Forecast & Live Conditions',
    description: 'Pantau cuaca secara real-time dengan prakiraan harian, mingguan, dan peta interaktif.',
    siteName: 'SkyCast',
    type: 'website',
  },

  // Icon
  icons: {
    icon: '/skyicon.png',
    apple: '/skyicon.png',
    shortcut: '/skyicon.png',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'SkyCast — Weather Forecast & Live Conditions',
    description: 'Aplikasi cuaca modern dengan data real-time dan peta interaktif.',
  },

  themeColor: '#0B131E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B131E] text-white`}>{children}</body>
    </html>
  );
}
