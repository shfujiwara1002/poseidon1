import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { TitleSlide } from './components/TitleSlide';
import { ProblemSlide } from './components/ProblemSlide';
import { SolutionSlide } from './components/SolutionSlide';
import { DashboardDemo } from './components/DashboardDemo';
import { ClosingSlide } from './components/ClosingSlide';

export const Video: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0a0e1a',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)'
    }}>
      {/* Title Slide - 6 seconds */}
      <Sequence from={0} durationInFrames={180}>
        <TitleSlide />
      </Sequence>

      {/* Problem Slide - 10 seconds */}
      <Sequence from={180} durationInFrames={300}>
        <ProblemSlide />
      </Sequence>

      {/* Solution Slide - 12 seconds */}
      <Sequence from={480} durationInFrames={360}>
        <SolutionSlide />
      </Sequence>

      {/* Dashboard Demo - 27 seconds */}
      <Sequence from={840} durationInFrames={810}>
        <DashboardDemo />
      </Sequence>

      {/* Closing Slide - 5 seconds */}
      <Sequence from={1650} durationInFrames={150}>
        <ClosingSlide />
      </Sequence>
    </AbsoluteFill>
  );
};
