---
name: Urban Vanguard Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#ffb4aa'
  on-secondary: '#690003'
  secondary-container: '#e50110'
  on-secondary-container: '#fff6f5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3034'
  tertiary-container: '#e2e2e7'
  on-tertiary-container: '#636469'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930006'
  tertiary-fixed: '#e2e2e7'
  tertiary-fixed-dim: '#c6c6cb'
  on-tertiary-fixed: '#1a1c1f'
  on-tertiary-fixed-variant: '#45474b'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  sale-crimson: '#E50010'
  chrome-silver: '#E2E2E6'
  concrete-muted: '#3C3C3D'
  surface-card: '#121213'
  border-subtle: '#222224'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 88px
    letterSpacing: 0.04em
  display-xl-mobile:
    fontFamily: Anton
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 0.03em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Anton
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.02em
  title-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.05em
  title-sm:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.16em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 3rem
---

## Brand & Style

This design system channels an unapologetic collision between Parisian haute couture and raw underground streetwear culture. Crafted for an audience embedded in global hip-hop scenes, subcultural movements, and avant-garde street fashion, the visual language balances stark architectural discipline with explosive promotional energy.

The aesthetic leans firmly into **High-Contrast Bold Minimalist Brutalism**. Stark monochrome surfaces establish editorial authority, while oversized condensed typography commands attention across lookbook grids, capsule releases, and campaign headers. Aggressive red accents punctuate transactional and promotional milestones, while subtle chrome-tinted surfaces introduce industrial street prestige. The UI must feel like a digital fashion zine: urgent, sculptural, and relentlessly modern.

## Colors

The foundation is built upon deep abyss black (`#080808`) and optic white (`#FFFFFF`), producing razor-sharp contrast that isolates apparel photography and typography. 

- **Primary (`#FFFFFF`):** High-impact headlines, critical text elements, and sharp active states against dark canvases.
- **Secondary (`#E50010` / `sale-crimson`):** Reserved for disruptive sale alerts ('MID SEASON SALE', 'PROMOTION'), flash drop countdowns, and urgent primary actions.
- **Tertiary (`#B4B4B9` / `chrome-silver`):** Industrial metallic neutral for secondary metadata, category tags, borders, and subtle icon states.
- **Neutral (`#080808`):** Deep charcoal-black background that eliminates chromatic distraction and allows garment textures to take center stage.
- **Surface & Borders (`#121213`, `#222224`):** Define structural editorial grids and card boundaries without introducing softness or distraction.

## Typography

The typographic hierarchy relies on extreme contrast between hyper-condensed display headlines and technical, modernist body details. 

- **Display & Headlines (`Anton`):** Heavy, condensed, all-caps presentation evokes vintage street posters, bold billboard promotions, and Parisian capsule collabs. Kerning is kept tight, line heights are strictly locked to mimic editorial poster titles.
- **Labels & Micro-Copy (`Space Grotesk`):** Technical, mono-grotesque style with expanded tracking (`0.12em` to `0.16em`) used for article categories (`/ MAGAZINE`, `/ COLLABORATION`), tags, prices, and navigation.
- **Body Text (`Work Sans`):** Clean, neutral, high-legibility sans-serif for product specifications, editorial narratives, and legal text, balancing readability against the extreme drama of the headlines.

## Layout & Spacing

The layout is grounded in a razor-sharp 12-column modular grid with zero ambient fluffs. Full-bleed editorial split-screens and asymmetric multi-panel lockups (as seen in campaign lookbooks) define desktop experiences.

- **Desktop (1024px+):** 12-column grid, `margin-desktop` (40px), and `gutter-desktop` (24px). Hero lookbook strips use 3-to-5 vertical slice column spans with full viewport heights.
- **Tablet (768px - 1023px):** 8-column layout with 24px margins; lookbook strips convert into 2-up responsive horizontal scroll units.
- **Mobile (<768px):** 4-column layout with 16px margins. Promotion units collapse to full-bleed edge-to-edge vertical stacks with sticky discovery rails.
- **Rhythm:** Spacing follows a strict geometric progression (4px, 8px, 16px, 24px, 48px). Gaps between product tiles remain narrow to reinforce a tight, catalog-driven editorial aesthetic.

## Elevation & Depth

This system avoids soft, atmospheric drop shadows entirely, opting instead for **tactile planar depth, dark surface-layering, and sharp contrast borders**:

- **No Blurred Shadows:** Depth is not communicated via diffused ambient drop shadows. Floating drop-shadows soften streetwear edges and contradict the raw brutalist ethos.
- **Tonal Stepping:** Layering occurs purely across surface fills: Canvas (`#080808`) → Surface Card (`#121213`) → Interactive Elevated Overlay (`#1A1A1C`).
- **High-Tension Borders:** Borders are 1px solid (`#222224` or `#3C3C3D`), creating architectural framing around banners, capsule cards, and input fields.
- **Active State Offset:** Interactive popups and dropdowns make use of crisp 1px borders in optic white (`#FFFFFF`) or sale crimson (`#E50010`) to establish dominant foreground priority.

## Shapes

The shape system is strictly **Sharp (`0`)**. Every element—from primary action buttons and promotional banners to thumbnail viewports and dropdown modals—features 0px border-radius.

The unyielding 90-degree corners establish an uncompromising urban silhouette, echoing poster bills, physical zines, and brutalist architecture. Images must maintain rectangular crops without rounded masking.

## Components

### Buttons
- **Primary Action:** Solid white fill (`#FFFFFF`), pure black text (`#080808`), all-caps `label-lg` typography, 0px radius, 14px 28px padding. Hover state inverts to pure black with a 1px solid white outline.
- **Promo / Flash Button:** Solid crimson fill (`#E50010`), white text (`#FFFFFF`), high-contrast all-caps.
- **Ghost / Editorial:** Transparent fill, 1px solid white (`#FFFFFF`) or metallic border (`#3C3C3D`), white text.

### Promo & Lookbook Cards
- **Editorial Lookbook Tile:** Full-bleed portrait image container with high-grain contrast. Absolute-positioned bottom caption featuring vertical taxonomy (e.g., `/ MEN`, `/ DISCOVER`) in `label-sm` with a translucent dark gradient underpinning.
- **Magazine Story Card:** Flat `#121213` surface, crisp 1px bottom border. Top image container, category badge in technical uppercase mono, and an Anton headline clamp.

### Chips & Category Badges
- **Status Tags:** Solid black background with 1px border (`#3C3C3D`), `label-sm` text in pure white.
- **Sale Chips:** Solid `#E50010` background, pure white text, zero radius, compact padding (`4px 8px`).

### Input Fields
- Monolithic rectangular container with `#080808` background, 1px solid border (`#3C3C3D`). Text in `body-md` (`#FFFFFF`). Focus state transforms border to high-contrast white (`#FFFFFF`) with zero focus-ring blur.

### Capsule Collection Carousels
- Multi-pane vertical slices featuring edge-to-edge images that expand slightly on hover (`scale 1.02`), separated by a hairline 1px black divider (`#080808`). Navigation triggers utilize stark minimalist arrows (`<` / `>`) with no backing container.

### Promotional Takeover Banners
- Split-screen asymmetric lockup: one half high-contrast typography (`MID SEASON SALE` stacked in Anton), the other half bold campaign imagery or solid Crimson red backdrop, framed with an explicit 1px stark white exit control.