# Interactive Hero Section Implementation Guide

## Overview
The home page has been transformed into a minimalist, mouse-driven interactive interface featuring:
- **Spotlight Effect**: Dynamic light that follows cursor movement
- **3D Bot**: Rotating cube character that follows mouse position
- **URL Input**: Positioned on the left side for entering target websites
- **Clean UI**: All textual content removed from hero section, keeping only interactive elements

## Components Created

### 1. Spotlight.tsx
**Location**: `components/Spotlight.tsx`

Implements a spotlight effect that follows the mouse cursor with a radial gradient overlay.

**Features**:
- Real-time mouse tracking
- Smooth radial gradient that follows cursor
- Configurable size and intensity
- CSS variable-based positioning for smooth animations

**Usage**:
```tsx
<Spotlight 
  className="w-full min-h-screen" 
  size={400} 
  intensity={0.6}
>
  {/* Content */}
</Spotlight>
```

### 2. Interactive3DBot.tsx
**Location**: `components/Interactive3DBot.tsx`

Renders a 3D rotating cube bot that responds to mouse movements via 3D transforms.

**Features**:
- 6-sided 3D cube with colored faces (blue, purple, cyan, indigo, etc.)
- Mouse-tracking rotation on X and Y axes
- Perspective 3D transforms with `preserve-3d`
- Glow effect around bot with pulsing animation
- Light source indicator following cursor

**Technical Details**:
- Uses CSS 3D transforms: `rotateX()`, `rotateY()`, `translateZ()`
- `backfaceVisibility: hidden` ensures only visible faces render
- Smooth 0.1s transitions for responsive feel

### 3. InteractiveHeroSection.tsx
**Location**: `components/InteractiveHeroSection.tsx`

Main layout component combining Spotlight and 3D Bot with URL input field.

**Features**:
- Left side: URL input with "Go" button
- Right side: 3D bot in spotlight
- Decorative top and bottom gradient borders
- Responsive flex layout
- Callback prop for URL submission

**Props**:
- `onSubmit?: (url: string) => void` - Callback when user submits URL
- `isLoading?: boolean` - Loading state for submit button

## Updated page.tsx
**Location**: `app/page.tsx`

The home page now uses the new InteractiveHeroSection component.

**Changes**:
- Removed: All text-heavy hero components (HomeHeroTitle, HomeHeroBadge, HomeHeroBackground, etc.)
- Removed: Decorative background effects from hero section
- Removed: "Re-imagine any website, in seconds" tagline and description
- Added: Clean minimalist header only
- Added: Full-screen interactive section with Spotlight and 3D Bot
- Preserved: Navigation, BX3 branding, routing functionality

## How It Works

### Mouse-Following Spotlight
1. Spotlight component tracks `mousemove` events on the window
2. Calculates cursor position relative to container bounds
3. Updates CSS variables `--spotlight-x` and `--spotlight-y`
4. Radial gradient dynamically repositions using these variables

### 3D Bot Rotation
1. Interactive3DBot tracks mouse position within its container
2. Calculates delta from center point
3. Converts to rotation angles: `rotationX = -deltaY * 15`, `rotationY = deltaX * 15`
4. Applies 3D transforms continuously with smooth transitions

### URL Submission
1. User enters URL in input field or types in search box
2. Click "Go" button or press Enter to submit
3. `handleHeroSubmit()` validates URL format
4. Routes to `/generation` page with URL stored in sessionStorage

## Running the Application

```bash
# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:3000
```

## Customization

### Adjust Spotlight Size and Intensity
In `InteractiveHeroSection.tsx`:
```tsx
<Spotlight 
  size={400}      // Change spotlight radius
  intensity={0.6} // Change brightness (0-1)
/>
```

### Modify 3D Bot Rotation Speed
In `Interactive3DBot.tsx`, adjust multiplier in mouse calculation:
```tsx
setRotationX(-deltaY * 15);  // Change 15 to increase/decrease rotation
setRotationY(deltaX * 15);
```

### Change 3D Bot Colors
Edit the face divs in `Interactive3DBot.tsx`:
```tsx
className="bg-gradient-to-br from-blue-500 to-cyan-500"  // Change colors
```

## Browser Compatibility

- Modern browsers with CSS 3D Transforms support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript enabled for mouse tracking
- Mobile/touch: Limited support due to 3D transforms and mouse tracking

## Performance Notes

- Mouse tracking uses `requestAnimationFrame` implicitly via browser rendering
- CSS variables update at native speed without JS animations
- Optimized with `pointer-events-none` on overlay elements
- Smooth 60 FPS expected on modern hardware

## Files Modified/Created

```
components/
├── Spotlight.tsx (NEW)
├── Interactive3DBot.tsx (NEW)
├── InteractiveHeroSection.tsx (NEW)
└── ...existing files

app/
├── page.tsx (MODIFIED - Replaced hero content)
├── page-interactive.tsx (NEW - Development version)
└── page.tsx.backup (BACKUP of original)
```

## Future Enhancements

- Add particle effects around bot on mouse hover
- Implement bot animations on successful URL submission
- Add sound effects for interactions
- Create mobile-responsive version with touch support
- Add ability to customize bot appearance

---

**Created**: [Current Date]
**Version**: 1.0
**Status**: Production Ready
