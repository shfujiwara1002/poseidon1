import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Elegant entrance animations
  const logoScale = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 120,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = spring({
    frame: frame - 30,
    fps,
    from: 50,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  const titleOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineY = spring({
    frame: frame - 50,
    fps,
    from: 30,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  const taglineOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shimmer = interpolate(frame % 120, [0, 60, 120], [0.4, 1, 0.4]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }}
      />

      {/* Gradient orb effect */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: shimmer * 0.6,
        }}
      />

      {/* Logo with refined styling */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 60,
          position: 'relative',
        }}
      >
        {/* Logo glow effect */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
            opacity: shimmer * 0.8,
          }}
        />

        <div
          style={{
            width: 140,
            height: 140,
            background: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)',
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            fontWeight: '700',
            color: '#ffffff',
            boxShadow: '0 20px 60px rgba(45, 212, 191, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          Ψ
        </div>
      </div>

      {/* Title with elegant typography */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 110,
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 30,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 40px rgba(45, 212, 191, 0.3)',
        }}
      >
        Poseidon.AI
      </div>

      {/* Refined tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 38,
          color: '#cbd5e1',
          textAlign: 'center',
          maxWidth: 1100,
          lineHeight: 1.5,
          fontWeight: '400',
          letterSpacing: '0.01em',
        }}
      >
        <span style={{ color: '#f1f5f9', fontWeight: '500' }}>Trusted Financial Personal Assistant</span>
        <div style={{ marginTop: 12, fontSize: 32, color: '#94a3b8' }}>
          Protect · Grow · Optimize
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          width: 120,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #2DD4BF 50%, transparent 100%)',
          opacity: taglineOpacity * 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
