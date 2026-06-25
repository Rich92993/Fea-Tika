export default function ElegantBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FAFAFA]">
      {/* Very subtle, slow-moving soft orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-50/80 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-drift"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-50/80 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-drift-reverse"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-slate-100/80 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-drift"></div>
      
      {/* Subtle grain/noise overlay for premium texture (optional, using a simple gradient here for performance) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 pointer-events-none"></div>
    </div>
  );
}
