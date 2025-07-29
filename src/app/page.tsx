import HeroSection from '@/components/sections/HeroSection';
import LinkManager from '@/components/sections/LinkManager';
import BenefitsSection from '@/components/sections/BenefitsSection';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Link Management Section */}
      <LinkManager />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Particle Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </main>
  );
}
