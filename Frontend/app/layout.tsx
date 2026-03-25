import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import SpaceBackground from '@/components/background/SpaceBackground';

export const metadata: Metadata = {
  title: 'ABISHEK RAJ — Gamer & Developer',
  description: 'Ultra-premium personal brand portfolio for ABISHEK RAJ — gamer, developer, achiever.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-void text-ink antialiased overflow-x-hidden">
        <SpaceBackground />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
