# Hyper-Dope Animations

Two stunning full-screen animations for loading and building states.

## HyperLoadingAnimation

A mesmerizing orbital animation with pulsing core, rotating rings, and floating particles. Perfect for initial app loading states.

**Features:**
- Animated orbital rings
- Pulsing gradient core
- Floating background particles
- Glitch text effects
- Corner accent animations
- Smooth color gradients (cyan/blue/purple)

## HyperBuildingAnimation

An engaging build progress animation with step tracking, progress bar, and floating code elements.

**Features:**
- Real-time progress bar with shimmer effect
- Build step status tracking
- Animated checkmarks for completed steps
- Floating code block particles
- Animated grid background
- Corner accent animations
- Smooth color gradients (emerald/teal/cyan)

## Usage

```tsx
import { HyperLoadingAnimation, HyperBuildingAnimation } from '@/components/animations';

// Loading state
{isLoading && <HyperLoadingAnimation />}

// Building state
{isBuilding && <HyperBuildingAnimation />}
```

## Customization

Both components are built with Framer Motion and Tailwind CSS. You can customize:
- Colors: Modify gradient classes
- Timing: Adjust `transition.duration` values
- Particles: Change array sizes in map functions
- Text: Update labels and messages

## Examples

### In a page component:
```tsx
'use client';
import { useState } from 'react';
import { HyperLoadingAnimation, HyperBuildingAnimation } from '@/components/animations';

export default function MyPage() {
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState(false);

  return (
    <>
      {loading && <HyperLoadingAnimation />}
      {building && <HyperBuildingAnimation />}
      {/* Your content */}
    </>
  );
}
```
