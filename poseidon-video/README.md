# Poseidon.AI Video Presentation

This is a 60-second animated video presentation for Poseidon.AI created with Remotion.

## Structure

The video consists of 4 main sections:

1. **Title Slide** (0-5s): Logo animation and tagline
2. **Problem Slide** (5-13s): The Coordination Gap - highlighting consumer pain points
3. **Solution Slide** (13-23s): Three core engines (Protect, Grow, Optimize)
4. **Dashboard Demo** (23-60s): Live dashboard walkthrough with animations

## Development

To preview the video in Remotion Studio:

```bash
npm run start
```

Then open http://localhost:3000 in your browser.

## Rendering

To render the final video:

```bash
npm run build
```

The output will be saved to `out/video.mp4`.

## Customization

- Edit slide timings in `src/Video.tsx`
- Modify individual slides in `src/components/`
- Adjust colors, fonts, and animations in each component file

## Key Features

- Smooth spring animations
- Coordinated timing across multiple elements
- Dark theme matching the Poseidon.AI brand
- Real dashboard data visualization
- Professional transitions between scenes
