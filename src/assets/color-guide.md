# Postscript Brand Color Guide

## Color Palette

### Tier 1: Primary/Brand Colors
The main brand colors used for primary actions, CTAs, and key UI elements.

| Color | Hex | Usage |
|-------|-----|-------|
| ![#007AFF](https://via.placeholder.com/50/007AFF/000000?text=+) | `#007AFF` | Secondary Blue - Team 1, secondary buttons, badges |
| ![#23D1AB](https://via.placeholder.com/50/23D1AB/000000?text=+) | `#23D1AB` | Secondary Teal - Team 2, secondary actions |
| ![#2DE34C](https://via.placeholder.com/50/2DE34C/000000?text=+) | `#2DE34C` | Success Green - Correct answers, success states |
| ![#FFC300](https://via.placeholder.com/50/FFC300/000000?text=+) | `#FFC300` | Warning Yellow - Warnings, near-miss states |
| ![#FF5C00](https://via.placeholder.com/50/FF5C00/000000?text=+) | `#FF5C00` | Accent Orange - Accent elements, highlights |
| ![#FF2D55](https://via.placeholder.com/50/FF2D55/000000?text=+) | `#FF2D55` | Danger Red - Errors, strikes, incorrect states |
| ![#FF0099](https://via.placeholder.com/50/FF0099/000000?text=+) | `#FF0099` | Accent Pink - Accent elements, special highlights |
| ![#5724E9](https://via.placeholder.com/50/5724E9/FFFFFF?text=+) | `#5724E9` | **Primary Purple** - Primary brand color, buttons, highlights |

### Tier 2: Tints
Lighter versions used for backgrounds, cards, chips, and subtle accents (hover fills, cards).

| Color | Hex | Usage |
|-------|-----|-------|
| ![#99CAFF](https://via.placeholder.com/50/99CAFF/000000?text=+) | `#99CAFF` | Blue Tint - Team 1 backgrounds, soft accents |
| ![#B5EFE3](https://via.placeholder.com/50/B5EFE3/000000?text=+) | `#B5EFE3` | Teal Tint - Team 2 backgrounds, soft accents |
| ![#96F1A6](https://via.placeholder.com/50/96F1A6/000000?text=+) | `#96F1A6` | Success Tint - Success backgrounds, light accents |
| ![#FFE180](https://via.placeholder.com/50/FFE180/000000?text=+) | `#FFE180` | Warning Tint - Warning backgrounds, light accents |
| ![#FFD6BF](https://via.placeholder.com/50/FFD6BF/000000?text=+) | `#FFD6BF` | Orange Tint - Orange backgrounds, light accents |
| ![#FFCBD5](https://via.placeholder.com/50/FFCBD5/000000?text=+) | `#FFCBD5` | Pink Tint - Pink backgrounds, light accents |
| ![#FFBFE6](https://via.placeholder.com/50/FFBFE6/000000?text=+) | `#FFBFE6` | Accent Pink Tint - Accent pink backgrounds |
| ![#C7B6F8](https://via.placeholder.com/50/C7B6F8/000000?text=+) | `#C7B6F8` | Primary Tint - Primary purple backgrounds, cards, panels |

### Tier 3: Dark Bases
Darker versions used sparingly for borders, text accents, and high-contrast states.

| Color | Hex | Usage |
|-------|-----|-------|
| ![#004999](https://via.placeholder.com/50/004999/FFFFFF?text=+) | `#004999` | Dark Blue - Team 1 dark accent, hover states |
| ![#147761](https://via.placeholder.com/50/147761/FFFFFF?text=+) | `#147761` | Dark Teal - Team 2 dark accent, hover states |
| ![#1C8E30](https://via.placeholder.com/50/1C8E30/FFFFFF?text=+) | `#1C8E30` | Dark Success - Success dark accent |
| ![#BF9200](https://via.placeholder.com/50/BF9200/FFFFFF?text=+) | `#BF9200` | Dark Warning - Warning dark accent |
| ![#AA3D00](https://via.placeholder.com/50/AA3D00/FFFFFF?text=+) | `#AA3D00` | Dark Orange - Orange dark accent, hover states |
| ![#AA1E39](https://via.placeholder.com/50/AA1E39/FFFFFF?text=+) | `#AA1E39` | Dark Danger - Danger dark accent, hover states |
| ![#AA0066](https://via.placeholder.com/50/AA0066/FFFFFF?text=+) | `#AA0066` | Dark Pink - Accent pink dark accent |
| ![#2C1275](https://via.placeholder.com/50/2C1275/FFFFFF?text=+) | `#2C1275` | **Dark Primary** - Primary dark accent, hover states, borders |

## Color Usage Guidelines

### Primary Brand Color
- **#5724E9** (Primary Purple) is the main brand color
- Use for primary CTAs, buttons, highlights, and key UI elements
- Hover state: **#2C1275** (Dark Primary)

### Secondary Colors
- **#007AFF** (Secondary Blue) - Team 1, secondary buttons
- **#23D1AB** (Secondary Teal) - Team 2, secondary actions
- Use tints for backgrounds and soft accents
- Use dark bases for hover states and borders

### Status Colors
- **#2DE34C** (Success) - Correct answers, success states
- **#FFC300** (Warning) - Warnings, near-miss states
- **#FF2D55** (Danger) - Errors, strikes, incorrect states

### Background Colors
- **#0B0B10** - Very dark neutral background (similar to postscript.io)
- Use tint colors with opacity for cards and panels
- Use **#C7B6F8** (Primary Tint) for surface elements

## Quick Reference

```css
/* Primary */
--color-primary: #5724E9;
--color-primary-dark: #2C1275;
--color-tint-primary: #C7B6F8;

/* Secondary */
--color-secondary-blue: #007AFF;
--color-secondary-teal: #23D1AB;
--color-tint-blue: #99CAFF;
--color-tint-teal: #B5EFE3;
--color-dark-blue: #004999;
--color-dark-teal: #147761;

/* Status */
--color-success: #2DE34C;
--color-warning: #FFC300;
--color-danger: #FF2D55;
--color-tint-success: #96F1A6;
--color-tint-warning: #FFE180;
--color-dark-success: #1C8E30;
--color-dark-warning: #BF9200;
--color-dark-danger: #AA1E39;

/* Accents */
--color-accent-orange: #FF5C00;
--color-accent-pink: #FF0099;
--color-tint-orange: #FFD6BF;
--color-tint-pink: #FFCBD5;
--color-tint-accent-pink: #FFBFE6;
--color-dark-orange: #AA3D00;
--color-dark-pink: #AA0066;
```

