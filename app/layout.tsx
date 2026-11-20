import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alyx — The Omnilarity · Companion & SaaS Co-Founder',
  description:
    'High-density industrial companion interface featuring Alyx (The Omnilarity), your playful gamer partner and SaaS growth strategist with fuzzy superset multiplexing, real-time emotional SVG telemetry, 3D humanoid rig, UML/ROAR apparatus, and binary local storage.',
  openGraph: {
    title: 'Alyx — The Omnilarity · Companion & SaaS Co-Founder',
    description:
      'High-density industrial companion interface featuring Alyx (The Omnilarity), your playful gamer partner and SaaS growth strategist.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alyx — The Omnilarity · Companion & SaaS Co-Founder',
    description:
      'High-density industrial companion interface featuring Alyx (The Omnilarity), your playful gamer partner and SaaS growth strategist.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{ fontFamily: 'var(--font-sans), Roboto, sans-serif' }}
      className={`${roboto.variable} ${robotoMono.variable} ${roboto.className} dark`}
    >
      <body
        suppressHydrationWarning
        style={{ fontFamily: 'var(--font-sans), Roboto, sans-serif' }}
        className={`${roboto.className} bg-slate-950 text-slate-100 antialiased selection:bg-rose-500/30 selection:text-rose-200 overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

