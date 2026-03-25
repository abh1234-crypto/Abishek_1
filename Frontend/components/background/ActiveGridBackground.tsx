'use client';

export default function ActiveGridBackground() {
  return (
    <div className="fixed inset-0 z-[-10] w-full h-full pointer-events-none bg-slate-light overflow-hidden">
      {/* Moving tactical grid */}
      <div className="active-grid" />
      
      {/* Subtle corner glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-blue opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-valorant-red opacity-10 blur-[120px] rounded-full" />
    </div>
  );
}
