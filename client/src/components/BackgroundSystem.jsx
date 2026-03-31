import React from 'react';

const BackgroundSystem = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base Grid */}
      <div className="absolute inset-0 cyber-grid opacity-[0.15]"></div>
      
      {/* Animated Scanline Overlay */}
      <div className="scanlines"></div>
      
      {/* Glowing Orbs / Data Nodes (Mock) */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-accent-primary/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px] animate-pulse [animation-delay:1s]"></div>
      
      {/* Moving Scanline (Rare) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent h-[2px] w-full animate-[scanline_8s_linear_infinite]"></div>
    </div>
  );
};

export default BackgroundSystem;
