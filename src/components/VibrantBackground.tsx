export default function VibrantBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0f172a]">
      {/* The LED Cycle Wrapper - This rotates the colors smoothly */}
      <div className="absolute inset-0 animate-led-cycle">
        {/* Base dark gradient to make colors pop */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"></div>
        
        {/* Intense glowing orbs */}
        <div className="absolute top-0 -left-4 w-[70vw] h-[70vw] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-[70vw] h-[70vw] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob [animation-delay:2s]"></div>
        <div className="absolute -bottom-32 left-20 w-[70vw] h-[70vw] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob [animation-delay:4s]"></div>
        <div className="absolute top-1/2 right-1/3 w-[50vw] h-[50vw] bg-cyan-500 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-float"></div>
      </div>
      
      {/* Subtle overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </div>
  );
}
