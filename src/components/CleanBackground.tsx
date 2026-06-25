export default function CleanBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>
      
      {/* Soft Top Gradient for depth */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-gray-50 to-transparent"></div>
    </div>
  );
}
