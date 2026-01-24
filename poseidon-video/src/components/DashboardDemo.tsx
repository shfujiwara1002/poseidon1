import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

export const DashboardDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dashboardY = spring({
    frame: frame - 10,
    fps,
    from: 30,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  const dashboardOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animate protection score
  const protectValue = interpolate(frame, [80, 140], [0, 0.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Animate growth accuracy
  const growValue = interpolate(frame, [100, 160], [0, 98.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Animate optimization savings
  const optimizeValue = interpolate(frame, [120, 180], [0, 408], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Animate protection score (right side)
  const protectionScore = interpolate(frame, [200, 260], [0, 99.98], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Show alerts section
  const alertsOpacity = interpolate(frame, [320, 350], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const alertsY = spring({
    frame: frame - 320,
    fps,
    from: 30,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  // Show optimizations section
  const optimizationsOpacity = interpolate(frame, [420, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const optimizationsY = spring({
    frame: frame - 420,
    fps,
    from: 30,
    to: 0,
    config: {
      damping: 100,
      stiffness: 80,
    },
  });

  // Show transactions section
  const transactionsOpacity = interpolate(frame, [520, 550], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const transactionsY = spring({
    frame: frame - 520,
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
        opacity: dashboardOpacity,
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: 50,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* Ambient gradient */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translateX(-50%)',
        }}
      />

      <div style={{ transform: `translateY(${dashboardY}px)`, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 50,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                fontWeight: '700',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(45, 212, 191, 0.3)',
              }}
            >
              Ψ
            </div>
            <div style={{ fontSize: 38, fontWeight: '700', color: '#f1f5f9' }}>
              Poseidon.AI
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: '#10B981',
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
              }}
            />
            <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: '500' }}>
              System Status: Optimal
            </div>
          </div>
        </div>

        {/* Command Center Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 40,
          }}
        >
          Command Center
        </div>

        {/* Main Cards Row */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginBottom: 24,
          }}
        >
          {/* Protect Card */}
          <div
            style={{
              flex: 1,
              padding: 32,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 20,
              border: '1px solid rgba(59, 130, 246, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #3B82F6 0%, #2563eb 100%)',
              }}
            />
            <div
              style={{
                fontSize: 13,
                color: '#3B82F6',
                marginBottom: 12,
                fontWeight: '700',
                letterSpacing: '0.05em',
              }}
            >
              ACTIVE
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: 20,
              }}
            >
              🛡️ Protect
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: '700',
                background: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 8,
              }}
            >
              {protectValue.toFixed(2)}%
            </div>
            <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 16, fontWeight: '500' }}>
              Threat Score
            </div>
            <div style={{ fontSize: 14, color: '#64748b' }}>
              1,248 transactions scanned
            </div>
          </div>

          {/* Grow Card */}
          <div
            style={{
              flex: 1,
              padding: 32,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 20,
              border: '1px solid rgba(16, 185, 129, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
              }}
            />
            <div
              style={{
                fontSize: 13,
                color: '#10B981',
                marginBottom: 12,
                fontWeight: '700',
                letterSpacing: '0.05em',
              }}
            >
              ACTIVE
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: 20,
              }}
            >
              📈 Grow
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 8,
              }}
            >
              {growValue.toFixed(1)}%
            </div>
            <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 16, fontWeight: '500' }}>
              Forecast Accuracy
            </div>
            <div style={{ fontSize: 14, color: '#64748b' }}>
              $4,200 projected surplus
            </div>
          </div>

          {/* Optimize Card */}
          <div
            style={{
              flex: 1,
              padding: 32,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 20,
              border: '1px solid rgba(139, 92, 246, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #8B5CF6 0%, #7c3aed 100%)',
              }}
            />
            <div
              style={{
                fontSize: 13,
                color: '#8B5CF6',
                marginBottom: 12,
                fontWeight: '700',
                letterSpacing: '0.05em',
              }}
            >
              OPTIMIZING
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: 20,
              }}
            >
              ⚡ Optimize
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: '700',
                background: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 8,
              }}
            >
              ${Math.round(optimizeValue)}/yr
            </div>
            <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 16, fontWeight: '500' }}>
              Pending Savings
            </div>
            <div style={{ fontSize: 14, color: '#64748b' }}>
              3 optimizations available
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Net Worth Projection */}
          <div
            style={{
              flex: 2,
              padding: 32,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 20,
              border: '1px solid rgba(16, 185, 129, 0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: 24, color: '#f1f5f9', fontWeight: '700' }}>
                Net Worth Projection
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 10,
                  fontSize: 14,
                  color: '#10B981',
                  fontWeight: '600',
                }}
              >
                AI Confidence: 94%
              </div>
            </div>
            <div
              style={{
                height: 180,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 3,
              }}
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const height = interpolate(
                  frame,
                  [260 + i * 2, 290 + i * 2],
                  [0, 70 + i * 1.2 + Math.sin(i * 0.5) * 8],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                  }
                );
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${height}%`,
                      background: i < 16 ? 'rgba(148, 163, 184, 0.3)' : 'linear-gradient(180deg, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0.3) 100%)',
                      borderRadius: '3px 3px 0 0',
                      border: i >= 16 ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
                      borderBottom: 'none',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Protection Score */}
          <div
            style={{
              flex: 1,
              padding: 32,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 20,
              border: '1px solid rgba(59, 130, 246, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #3B82F6 0%, #2563eb 100%)',
              }}
            />
            <div style={{ fontSize: 20, color: '#cbd5e1', marginBottom: 24, fontWeight: '600' }}>
              Protection Score
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 4,
              }}
            >
              {protectionScore.toFixed(2)}
            </div>
            <div style={{ fontSize: 16, color: '#64748b', marginBottom: 20 }}>/100</div>
            <div
              style={{
                padding: '10px 20px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 10,
                fontSize: 15,
                color: '#10B981',
                fontWeight: '600',
              }}
            >
              ✓ Excellent
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Overlay */}
      {frame > 320 && (
        <div
          style={{
            position: 'absolute',
            top: 180,
            left: 80,
            opacity: alertsOpacity,
            transform: `translateY(${alertsY}px)`,
            padding: 28,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            border: '2px solid rgba(251, 191, 36, 0.4)',
            minWidth: 480,
            boxShadow: '0 20px 60px rgba(251, 191, 36, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#fbbf24',
              marginBottom: 16,
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            ⚠️ Security Alert
          </div>
          <div style={{ fontSize: 17, color: '#f1f5f9', marginBottom: 8, fontWeight: '600' }}>
            Unusual Login Attempt Detected
          </div>
          <div style={{ fontSize: 14, color: '#94a3b8' }}>
            New login from San Francisco, CA • Blocked automatically
          </div>
        </div>
      )}

      {/* Optimizations Overlay */}
      {frame > 420 && (
        <div
          style={{
            position: 'absolute',
            top: 180,
            right: 80,
            opacity: optimizationsOpacity,
            transform: `translateY(${optimizationsY}px)`,
            padding: 28,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            border: '2px solid rgba(139, 92, 246, 0.4)',
            minWidth: 480,
            boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#a78bfa',
              marginBottom: 16,
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            ⚡ 3 Pending Optimizations
          </div>
          <div style={{ fontSize: 16, color: '#f1f5f9', marginBottom: 6, fontWeight: '600' }}>
            Cancel unused Hulu subscription
          </div>
          <div style={{ fontSize: 14, color: '#10b981', marginBottom: 18 }}>
            💰 Save $17.99/month
          </div>
          <div style={{ fontSize: 16, color: '#f1f5f9', marginBottom: 6, fontWeight: '600' }}>
            Move $500 to high-yield savings
          </div>
          <div style={{ fontSize: 14, color: '#10b981' }}>
            💰 Earn $24/year additional interest
          </div>
        </div>
      )}

      {/* Transactions Overlay */}
      {frame > 520 && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            opacity: transactionsOpacity,
            transform: `translateY(${transactionsY}px)`,
            padding: 28,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            border: '2px solid rgba(16, 185, 129, 0.4)',
            minWidth: 580,
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#6ee7b7',
              marginBottom: 18,
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            ✓ Recent Activity
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 14,
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 16, color: '#f1f5f9', fontWeight: '500' }}>Costco</div>
            <div
              style={{
                fontSize: 15,
                color: '#10b981',
                fontWeight: '600',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '4px 12px',
                borderRadius: 8,
              }}
            >
              $140.18 • SAFE
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 16, color: '#f1f5f9', fontWeight: '500' }}>
              Restaurant - Downtown
            </div>
            <div
              style={{
                fontSize: 15,
                color: '#10b981',
                fontWeight: '600',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '4px 12px',
                borderRadius: 8,
              }}
            >
              $102.34 • SAFE
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
