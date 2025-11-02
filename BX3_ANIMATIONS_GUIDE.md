# BX3 Animations Guide

## Available Animations

### 1. **Glow Effect** (`.bx3-glow`)
Cyan pulsing glow that radiates outward. Perfect for highlighting important elements.

```html
<div class="bx3-glow p-4 border border-cyan-500 rounded-lg">
  Important Content
</div>
```

**Duration**: 3s infinite  
**Effect**: Box-shadow pulsing from subtle to intense  
**Best for**: Buttons, CTAs, featured sections

---

### 2. **Pulse Animation** (`.bx3-pulse`)
Subtle scaling up and down. Great for drawing attention without being too dramatic.

```html
<button class="bx3-pulse px-6 py-2 bg-cyan-500">
  Click Me
</button>
```

**Duration**: 2s infinite  
**Scale**: 1 → 1.02 → 1  
**Best for**: Buttons, badges, notification indicators

---

### 3. **Float Animation** (`.bx3-float`)
Gentle floating up and down effect. Creates a sense of weightlessness.

```html
<div class="bx3-float w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg">
  Floating Card
</div>
```

**Duration**: 3s infinite  
**Movement**: ±5px on Y-axis  
**Best for**: Cards, floating elements, accent shapes

---

### 4. **Gradient Animation** (`.bx3-gradient`)
Animated gradient that cycles through cyan → blue → purple → cyan.

```html
<div class="bx3-gradient text-white text-center py-8 rounded-lg">
  Animated Gradient Background
</div>
```

**Duration**: 4s infinite  
**Colors**: Cyan → Blue → Purple  
**Best for**: Backgrounds, headers, hero sections

---

### 5. **Scale on Hover** (`.bx3-hover-scale`)
Scales up slightly and rotates on hover. Adds interactivity.

```html
<button class="bx3-hover-scale bg-slate-700 text-white px-6 py-2 rounded">
  Hover Me
</button>
```

**Scale**: 1.05x  
**Rotation**: 0.5deg  
**Best for**: Buttons, links, interactive elements

---

### 6. **Glow on Hover** (`.bx3-hover-glow`)
Adds a strong cyan glow when hovering. Very eye-catching.

```html
<button class="bx3-hover-glow bg-slate-700 text-cyan-400 px-6 py-2 rounded border border-cyan-500">
  Glow Hover
</button>
```

**Effect**: Box-shadow expands to 40px  
**Best for**: Premium buttons, important CTAs

---

### 7. **Lift on Hover** (`.bx3-hover-lift`)
Element lifts up (translateY) with shadow growing underneath.

```html
<div class="bx3-hover-lift bg-slate-800 p-6 rounded-lg border border-slate-700">
  Lift Card
</div>
```

**Lift**: -8px  
**Shadow**: 0 10px 25px with cyan tint  
**Best for**: Cards, sections, containers

---

### 8. **Card Hover Effect** (`.dark .card-hover`)
Dark mode specific card hover with background tint and border glow.

```html
<div class="dark card-hover bg-slate-800 p-6 rounded-lg border border-slate-700">
  Dark Mode Card
</div>
```

**Background**: Subtle cyan tint  
**Border**: Glows cyan  
**Best for**: Cards, list items in dark mode

---

## Combining Animations

You can combine multiple animations for enhanced effects:

```html
<!-- Floating card with glow -->
<div class="bx3-float bx3-hover-lift bg-slate-800 p-6 rounded-lg border border-cyan-500">
  Combined Effect
</div>

<!-- Pulsing button with hover scale -->
<button class="bx3-pulse bx3-hover-scale bg-cyan-500 text-slate-900 px-8 py-3 rounded font-bold">
  Enhanced Button
</button>

<!-- Gradient background with float effect -->
<div class="bx3-gradient bx3-float p-8 text-white rounded-lg">
  Gradient + Float
</div>
```

---

## Animation Performance Tips

1. **GPU Acceleration**: Animations use `transform` and `box-shadow` which are GPU-accelerated
2. **Smooth Motion**: All animations use `ease-in-out` or `cubic-bezier` for smooth 60fps
3. **Best Practices**:
   - Don't apply too many animations to one element
   - Use animations on elements that users interact with
   - Test on lower-end devices to ensure smooth performance

---

## Color References

### Gradient Colors:
- **Cyan**: `#06b6d4` (rgb(6, 182, 212))
- **Blue**: `#3b82f6` (rgb(59, 130, 246))
- **Purple**: `#8b5cf6` (rgb(139, 92, 246))

### Dark Mode Colors:
- **Background**: `#020817` (rgb(2, 8, 23))
- **Card**: `#1e293b` (rgb(30, 41, 59))
- **Accent**: `#22d3ee` (rgb(34, 211, 238))

---

## Customizing Animation Speed

Edit `styles/main.css` to adjust timing:

```css
/* Faster animations */
.bx3-pulse {
  animation: bx3-pulse 1s ease-in-out infinite; /* Changed from 2s */
}

/* Slower animations */
.bx3-float {
  animation: bx3-float 5s ease-in-out infinite; /* Changed from 3s */
}
```

---

## Real-World Examples

### Example 1: Animated CTA Button
```html
<button class="bx3-hover-glow bx3-pulse bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-8 py-4 rounded-lg">
  Get Started
</button>
```

### Example 2: Floating Feature Card
```html
<div class="bx3-float bx3-hover-lift bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
  <h3 class="text-cyan-400 text-lg font-bold mb-2">Feature</h3>
  <p class="text-slate-300">Description of your feature</p>
</div>
```

### Example 3: Hero Section with Gradient
```html
<section class="bx3-gradient h-96 flex items-center justify-center rounded-xl overflow-hidden">
  <div class="text-center text-white">
    <h1 class="text-5xl font-bold mb-4">Welcome to BX3</h1>
    <p class="text-xl">Build amazing with BOOS Builder Bot</p>
  </div>
</section>
```

### Example 4: Glowing Badge
```html
<span class="bx3-glow bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500">
  New Feature
</span>
```

---

## Troubleshooting

### Animations Not Playing?
- Make sure dark mode CSS is enabled (`html.dark`)
- Check that CSS is imported in your component
- Verify animation names match exactly

### Animation is Stuttering?
- Check for too many animations running simultaneously
- Reduce the number of elements with animations
- Test on a lower-end device to confirm performance

### Colors Look Wrong?
- Verify dark mode is enabled
- Check that CSS variables are defined in `styles/main.css`
- Make sure you're not overriding colors with inline styles

---

## Summary

BX3 comes with 8 built-in animations to enhance your UI:

| Animation | Duration | Best For |
|-----------|----------|----------|
| `.bx3-glow` | 3s | Highlights |
| `.bx3-pulse` | 2s | Indicators |
| `.bx3-float` | 3s | Cards |
| `.bx3-gradient` | 4s | Backgrounds |
| `.bx3-hover-scale` | 0.3s | Buttons |
| `.bx3-hover-glow` | 0.3s | CTAs |
| `.bx3-hover-lift` | 0.3s | Cards |
| `.dark .card-hover` | 0.3s | Dark Cards |

Mix and match to create the perfect experience for your users! 🚀
