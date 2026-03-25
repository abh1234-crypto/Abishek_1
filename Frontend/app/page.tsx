import HeroSection from '@/components/hero/HeroSection';
import AboutMe from '@/components/gaming/AboutMe';
import GamingStats from '@/components/gaming/GamingStats';
import GamingSetup from '@/components/gaming/GamingSetup';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="relative bg-transparent">
      <div className="page-content">
        <HeroSection />
        
        {/* Generous spacing wrappers for cleaner aesthetic */}
        <div className="max-w-[1400px] mx-auto pb-32">
          <AboutMe />
          <div className="h-20" /> {/* Clean breathing room */}
          <GamingStats />
          <div className="h-20" />
          <GamingSetup />
          <div className="h-20" />
          <ContactForm />
        </div>

        <footer className="text-center py-16 px-4 bg-void/50 border-t border-gray-900/50 backdrop-blur-md">
           <div className="section-divider-space mb-8" />
           <p className="font-rajdhani font-bold text-gray-500 text-sm tracking-widest uppercase hover:text-cyan transition-colors duration-300">
             © 2025 ABISHEK RAJ — Precision & Performance
           </p>
        </footer>
      </div>
    </main>
  );
}
