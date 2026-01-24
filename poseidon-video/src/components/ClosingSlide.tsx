import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const ClosingSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 120,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const logoOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = spring({
    frame: frame - 20,
    fps,
    from: 40,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  const ctaOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaY = spring({
    frame: frame - 40,
    fps,
    from: 30,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  const contactOpacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shimmer = interpolate(frame % 120, [0, 60, 120], [0.5, 1, 0.5]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        justifyContent: 'center',
        alignItems: 'center',
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

      {/* Gradient orb effect */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: shimmer * 0.7,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 50,
          position: 'relative',
        }}
      >
        {/* Logo glow */}
        <div
          style={{
            position: 'absolute',
            inset: -25,
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: shimmer,
          }}
        />

        <div
          style={{
            width: 120,
            height: 120,
            background: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            fontWeight: '700',
            color: '#ffffff',
            boxShadow: '0 24px 60px rgba(45, 212, 191, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            border: '2px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          Ψ
        </div>
      </div>

      {/* Main message */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          Your Financial Future,
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: '700',
            background: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          Intelligently Protected
        </div>
      </div>

      {/* Call to action */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: '#cbd5e1',
            marginBottom: 30,
            fontWeight: '400',
          }}
        >
          Join the future of personal finance
        </div>

        {/* CTA Button */}
        <div
          style={{
            display: 'inline-block',
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)',
            borderRadius: 16,
            fontSize: 24,
            fontWeight: '700',
            color: '#ffffff',
            boxShadow: '0 12px 40px rgba(45, 212, 191, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          Get Early Access
        </div>
      </div>

      {/* Contact information */}
      <div
        style={{
          opacity: contactOpacity,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 20, color: '#94a3b8', marginBottom: 12 }}>
          poseidon.ai
        </div>
        <div style={{ fontSize: 18, color: '#64748b' }}>
          Building trust through transparency
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          width: 150,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #2DD4BF 50%, transparent 100%)',
          opacity: contactOpacity * 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
