import { useEffect, useState } from 'react';

const TechBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }>>([]);

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
        }}
      />
      
      {/* Floating tech icons */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-float-slow"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.5}s`,
              animationDuration: `${8 + particle.speed * 2}s`,
            }}
          >
            <div 
              className="bg-primary/10 rounded-full backdrop-blur-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Tech symbols floating */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 animate-pulse-slow opacity-[0.08] text-6xl text-primary">
          {'</>'}
        </div>
        <div className="absolute top-3/4 right-1/4 animate-pulse-slow opacity-[0.08] text-4xl text-primary" style={{ animationDelay: '2s' }}>
          ⚡
        </div>
        <div className="absolute top-1/2 left-3/4 animate-pulse-slow opacity-[0.08] text-5xl text-primary" style={{ animationDelay: '4s' }}>
          🚀
        </div>
        <div className="absolute top-1/3 right-1/3 animate-pulse-slow opacity-[0.08] text-3xl text-primary" style={{ animationDelay: '6s' }}>
          ⚙️
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    </div>
  );
};

export default TechBackground;