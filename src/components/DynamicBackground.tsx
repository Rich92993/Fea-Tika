export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Soft glowing orbs that drift and morph */}
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blue-200/60 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-violet-200/60 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob [animation-delay:2s]"></div>
      <div className="absolute -bottom-32 left-20 w-[500px] h-[500px] bg-indigo-200/60 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob [animation-delay:4s]"></div>
      
      {/* A subtle central glow to tie it together */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/40 rounded-full filter blur-[120px] animate-pulse"></div>
    </div>
  );
}
