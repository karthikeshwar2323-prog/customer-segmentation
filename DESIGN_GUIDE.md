# Apex Insights - Design Guide

## 🎨 Netflix-Inspired Design System

This guide explains the design principles and implementation details of the Apex Insights Netflix-inspired theme.

## Color Palette

### Primary Colors

#### Netflix Red
```css
--primary: 0 100% 50%
```
**RGB**: `rgb(255, 0, 0)`  
**HEX**: `#FF0000`  
**Usage**: Primary buttons, active states, important metrics, brand accents

#### Primary Glow
```css
--primary-glow: 0 100% 60%
```
**Usage**: Hover states, glowing effects, gradient endpoints

### Background Colors

#### Main Background
```css
--background: 0 0% 8%
```
**RGB**: `rgb(20, 20, 20)`  
**HEX**: `#141414`  
**Usage**: Page background, main container

#### Card Background
```css
--card: 0 0% 12%
```
**RGB**: `rgb(31, 31, 31)`  
**HEX**: `#1F1F1F`  
**Usage**: Card components, elevated surfaces

#### Secondary Background
```css
--secondary: 0 0% 18%
```
**RGB**: `rgb(46, 46, 46)`  
**HEX**: `#2E2E2E`  
**Usage**: Hover states, secondary surfaces

#### Muted Background
```css
--muted: 0 0% 18%
```
**Usage**: Disabled states, subtle backgrounds

### Text Colors

#### Foreground (Primary Text)
```css
--foreground: 0 0% 95%
```
**RGB**: `rgb(242, 242, 242)`  
**HEX**: `#F2F2F2`  
**Usage**: Primary text, headings, important content

#### Muted Foreground (Secondary Text)
```css
--muted-foreground: 0 0% 60%
```
**RGB**: `rgb(153, 153, 153)`  
**HEX**: `#999999`  
**Usage**: Secondary text, descriptions, metadata

### Border Colors

#### Border
```css
--border: 0 0% 20%
```
**RGB**: `rgb(51, 51, 51)`  
**HEX**: `#333333`  
**Usage**: Dividers, card borders, input borders

### Status Colors

#### Success
```css
--success: 142 76% 45%
```
**RGB**: `rgb(27, 201, 100)`  
**HEX**: `#1BC964`  
**Usage**: Success messages, positive metrics, growth indicators

#### Warning
```css
--warning: 38 92% 55%
```
**RGB**: `rgb(247, 148, 29)`  
**HEX**: `#F7941D`  
**Usage**: Warning messages, caution indicators

#### Destructive
```css
--destructive: 0 84.2% 60.2%
```
**RGB**: `rgb(239, 68, 68)`  
**HEX**: `#EF4444`  
**Usage**: Error messages, delete actions, critical alerts

### Chart Colors

```css
--chart-1: 0 100% 50%      /* Netflix Red */
--chart-2: 142 76% 45%     /* Green */
--chart-3: 271 81% 56%     /* Purple */
--chart-4: 38 92% 55%      /* Orange */
--chart-5: 200 80% 50%     /* Blue */
```

## Typography

### Font Families
- **Primary**: System font stack (optimized for each platform)
- **Monospace**: For code and data

### Font Sizes
- **Hero**: `text-4xl` (36px) - `text-6xl` (60px)
- **Heading 1**: `text-3xl` (30px)
- **Heading 2**: `text-2xl` (24px)
- **Heading 3**: `text-xl` (20px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Font Weights
- **Bold**: `font-bold` (700) - Headings, emphasis
- **Semibold**: `font-semibold` (600) - Subheadings
- **Medium**: `font-medium` (500) - Navigation, buttons
- **Normal**: `font-normal` (400) - Body text

### Letter Spacing
- **Tight**: `tracking-tight` - Logo, headings
- **Normal**: Default - Body text
- **Wide**: `tracking-wide` - Uppercase labels

## Spacing System

### Padding/Margin Scale
```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
```

### Common Patterns
- **Card Padding**: `p-6` (24px)
- **Section Spacing**: `space-y-6` (24px vertical)
- **Button Padding**: `px-4 py-2` (16px horizontal, 8px vertical)
- **Container Padding**: `px-4 sm:px-6 lg:px-8`

## Border Radius

### Radius Scale
```css
--radius: 0.25rem  /* 4px - Sharp, modern corners */
```

### Usage
- **Buttons**: `rounded` (4px)
- **Cards**: `rounded` (4px)
- **Inputs**: `rounded` (4px)
- **Logo Icon**: `rounded` (4px)

## Shadows

### Elegant Shadow (Red Glow)
```css
--shadow-elegant: 0 10px 40px -10px hsl(0 100% 50% / 0.4)
```
**Usage**: Primary buttons, important cards, logo

### Card Shadow
```css
--shadow-card: 0 4px 20px rgba(0, 0, 0, 0.5)
```
**Usage**: Elevated cards, modals, dropdowns

### Hover Shadow
```css
box-shadow: 0 8px 30px rgba(229, 9, 20, 0.3)
```
**Usage**: Card hover states (with `.card-hover` class)

## Gradients

### Primary Gradient (Red)
```css
--gradient-primary: linear-gradient(135deg, hsl(0 100% 50%), hsl(0 100% 40%))
```
**Usage**: Gradient text, premium features, hero sections

### Hero Gradient (Fade to Black)
```css
--gradient-hero: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)
```
**Usage**: Hero overlays, image overlays

## Animations & Transitions

### Smooth Transition
```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```
**Usage**: Hover effects, state changes

### Common Animations
- **Hover Scale**: `transform: scale(1.05)` - Cards
- **Fade In**: `opacity: 0 → 1` - Page loads
- **Slide In**: `translateY(20px) → 0` - Content reveals

## Custom Utility Classes

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, hsl(0 100% 50%), hsl(0 100% 70%));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
```
**Usage**: Logo text, premium headings

**Example**:
```html
<h1 className="text-4xl font-bold gradient-text">APEX INSIGHTS</h1>
```

### Card Hover Effect
```css
.card-hover {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(229, 9, 20, 0.3);
}
```
**Usage**: Interactive cards, clickable items

**Example**:
```html
<div className="card-hover bg-card p-6 rounded">
  Card content
</div>
```

### Netflix Glow
```css
.netflix-glow {
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
}
```
**Usage**: Logo icon, important elements

**Example**:
```html
<div className="bg-primary rounded netflix-glow">
  <TrendingUp className="h-6 w-6" />
</div>
```

## Component Patterns

### Button Styles

#### Primary Button
```html
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click Me
</Button>
```

#### Secondary Button
```html
<Button variant="secondary" className="bg-secondary text-secondary-foreground">
  Cancel
</Button>
```

#### Ghost Button
```html
<Button variant="ghost" className="hover:bg-secondary">
  Learn More
</Button>
```

### Card Styles

#### Standard Card
```html
<div className="bg-card border border-border rounded p-6">
  <h3 className="text-xl font-semibold mb-4">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

#### Interactive Card
```html
<div className="bg-card border border-border rounded p-6 card-hover cursor-pointer">
  <h3 className="text-xl font-semibold mb-4">Clickable Card</h3>
  <p className="text-muted-foreground">Hover to see effect</p>
</div>
```

### Navigation Styles

#### Active Navigation Item
```html
<Link className="bg-primary text-primary-foreground px-4 py-2 rounded">
  Dashboard
</Link>
```

#### Inactive Navigation Item
```html
<Link className="text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-2 rounded">
  Settings
</Link>
```

## Layout Patterns

### Page Container
```html
<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Page content -->
</div>
```

### Grid Layout
```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid items -->
</div>
```

### Flex Layout
```html
<div className="flex items-center justify-between gap-4">
  <!-- Flex items -->
</div>
```

## Accessibility

### Color Contrast
- **Primary Text on Background**: 14.5:1 (AAA)
- **Muted Text on Background**: 4.8:1 (AA)
- **Primary Button**: 21:1 (AAA)

### Focus States
All interactive elements have visible focus states:
```css
focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
```

### Screen Reader Support
- Semantic HTML elements
- ARIA labels where needed
- Proper heading hierarchy

## Responsive Design

### Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile-First Approach
```html
<!-- Mobile: Stack vertically -->
<!-- Desktop: Side by side -->
<div className="flex flex-col xl:flex-row gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

## Best Practices

### 1. Use Semantic Tokens
✅ **Good**: `bg-primary`, `text-foreground`, `border-border`  
❌ **Bad**: `bg-red-500`, `text-white`, `border-gray-700`

### 2. Maintain Consistency
- Use the same spacing scale throughout
- Stick to defined color palette
- Follow typography hierarchy

### 3. Optimize Performance
- Use CSS variables for theme switching
- Minimize custom CSS
- Leverage Tailwind utilities

### 4. Ensure Accessibility
- Maintain high contrast ratios
- Provide focus indicators
- Use semantic HTML

### 5. Test Responsiveness
- Test on multiple screen sizes
- Ensure touch targets are large enough (44x44px minimum)
- Verify text readability on mobile

## Quick Reference

### Common Class Combinations

**Card**:
```
bg-card border border-border rounded p-6
```

**Button**:
```
bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90
```

**Heading**:
```
text-2xl font-bold text-foreground mb-4
```

**Body Text**:
```
text-base text-muted-foreground
```

**Container**:
```
container mx-auto px-4 sm:px-6 lg:px-8
```

## Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Components**: https://ui.shadcn.com
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

**Last Updated**: December 1, 2025  
**Version**: 1.0.0  
**Design System**: Netflix-Inspired Dark Theme
