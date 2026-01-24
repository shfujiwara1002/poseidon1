import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const SolutionSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame: frame - 10,
    fps,
    from: 40,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const engines = [
    {
      icon: '🛡️',
      title: 'Protect',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
      features: ['Detect anomalies', 'Explain risks', 'Alert on fraud'],
      delay: 50,
    },
    {
      icon: '📈',
      title: 'Grow',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
      features: ['Forecast cash flow', 'Recommend portfolios', 'Optimize returns'],
      delay: 100,
    },
    {
      icon: '⚡',
      title: 'Optimize',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      features: ['Automate execution', 'Human approval', 'Smart coordination'],
      delay: 150,
    },
  ];

  const principleOpacity = interpolate(frame, [220, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const principleY = spring({
    frame: frame - 220,
    fps,
    from: 30,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        padding: '80px 100px',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.4,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 76,
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 20,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        Poseidon.AI Solution
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 32,
          color: '#cbd5e1',
          marginBottom: 70,
          textAlign: 'center',
          fontWeight: '400',
        }}
      >
        Three Core Engines Working in Harmony
      </div>

      {/* Engine Cards */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          marginBottom: 70,
        }}
      >
        {engines.map((engine, index) => {
          const cardY = spring({
            frame: frame - engine.delay,
            fps,
            from: 50,
            to: 0,
            config: {
              damping: 100,
              stiffness: 80,
            },
          });

          const cardOpacity = interpolate(
            frame,
            [engine.delay, engine.delay + 30],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          const iconFloat = Math.sin(((frame - engine.delay) / 30) * Math.PI) * 3;

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                width: 360,
                position: 'relative',
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: -30,
                  background: engine.bgGradient,
                  filter: 'blur(40px)',
                  opacity: 0.6,
                }}
              />

              {/* Card */}
              <div
                style={{
                  position: 'relative',
                  padding: 35,
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 24,
                  border: `2px solid ${engine.color}40`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  boxShadow: `0 20px 60px ${engine.color}20`,
                }}
              >
                {/* Top accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: 3,
                    background: engine.gradient,
                    borderRadius: '0 0 3px 3px',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    fontSize: 72,
                    transform: `translateY(${iconFloat}px)`,
                    marginTop: 10,
                  }}
                >
                  {engine.icon}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: 44,
                    fontWeight: '700',
                    background: engine.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {engine.title}
                </div>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                  {engine.features.map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: 19,
                        color: '#cbd5e1',
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          background: engine.gradient,
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Principle */}
      <div
        style={{
          opacity: principleOpacity,
          transform: `translateY(${principleY}px)`,
          position: 'relative',
        }}
      >
        {/* Accent line above */}
        <div
          style={{
            width: 80,
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, #2DD4BF 50%, transparent 100%)',
            margin: '0 auto 30px',
          }}
        />

        <div
          style={{
            fontSize: 30,
            color: '#e0f2fe',
            textAlign: 'center',
            fontWeight: '400',
            lineHeight: 1.6,
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <span style={{ color: '#2DD4BF', fontWeight: '600' }}>Deterministic models</span> compute
          {' · '}
          <span style={{ color: '#2DD4BF', fontWeight: '600' }}>GenAI</span> explains
          {' · '}
          <span style={{ color: '#2DD4BF', fontWeight: '600' }}>Humans</span> approve
        </div>
      </div>
    </AbsoluteFill>
  );
};
