import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const ProblemSlide: React.FC = () => {
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

  const problems = [
    {
      text: 'Fraud Losses',
      stat: '$12.5B',
      detail: 'Lost annually',
      delay: 50,
      icon: '⚠️'
    },
    {
      text: 'Hidden Subscriptions',
      stat: '$133/mo',
      detail: 'Wasted on average',
      delay: 80,
      icon: '💸'
    },
    {
      text: 'Overdraft Fees',
      stat: 'Billions',
      detail: 'Unnecessary charges',
      delay: 110,
      icon: '📉'
    },
    {
      text: 'Manual Coordination',
      stat: '$12B+',
      detail: 'Annual cost',
      delay: 140,
      icon: '⏱️'
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        padding: '100px 120px',
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
            linear-gradient(rgba(239, 68, 68, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.4,
        }}
      />

      {/* Red gradient orb for problem theme */}
      <div
        style={{
          position: 'absolute',
          right: '10%',
          top: '20%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 82,
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffffff 0%, #fca5a5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 30,
          letterSpacing: '-0.02em',
        }}
      >
        The Coordination Gap
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 36,
          color: '#cbd5e1',
          marginBottom: 80,
          fontWeight: '400',
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        Consumers are forced to be their own{' '}
        <span style={{ color: '#f1f5f9', fontWeight: '500' }}>financial integrators</span>
      </div>

      {/* Problem Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, maxWidth: 1400 }}>
        {problems.map((problem, index) => {
          const itemY = spring({
            frame: frame - problem.delay,
            fps,
            from: 40,
            to: 0,
            config: {
              damping: 100,
              stiffness: 80,
            },
          });

          const itemOpacity = interpolate(
            frame,
            [problem.delay, problem.delay + 25],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          const pulseScale = interpolate(
            (frame - problem.delay) % 90,
            [0, 45, 90],
            [1, 1.05, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 20,
                padding: 40,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                }}
              />

              {/* Icon */}
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                  transform: `scale(${pulseScale})`,
                }}
              >
                {problem.icon}
              </div>

              {/* Problem name */}
              <div
                style={{
                  fontSize: 28,
                  color: '#f1f5f9',
                  fontWeight: '600',
                  marginBottom: 12,
                }}
              >
                {problem.text}
              </div>

              {/* Statistic */}
              <div
                style={{
                  fontSize: 44,
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #fca5a5 0%, #ef4444 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 8,
                }}
              >
                {problem.stat}
              </div>

              {/* Detail */}
              <div
                style={{
                  fontSize: 22,
                  color: '#94a3b8',
                  fontWeight: '400',
                }}
              >
                {problem.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 120,
          width: 200,
          height: 3,
          background: 'linear-gradient(90deg, #ef4444 0%, transparent 100%)',
          opacity: subtitleOpacity * 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
