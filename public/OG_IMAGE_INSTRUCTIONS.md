# OG Image Instructions

An SVG template has been created at `public/og-image.svg`. To convert it to PNG:

## Option 1: Online Converter
1. Open https://cloudconvert.com/svg-to-png
2. Upload `og-image.svg`
3. Set dimensions to 1200x630
4. Download as `og-image.png`

## Option 2: Using ImageMagick (if installed)
```bash
convert -background none -size 1200x630 og-image.svg og-image.png
```

## Option 3: Using Inkscape (if installed)
```bash
inkscape og-image.svg --export-filename=og-image.png --export-width=1200 --export-height=630
```

## Option 4: Create Custom Design
Use Figma, Canva, or Photoshop with these specs:
- Size: 1200x630px
- Background: #0D0D0D (dark)
- Title: "The Systems CTO Dispatch" (Playfair Display or similar serif, 72px, white)
- Subtitle: "Architecture. AI Automation. Distributed Systems." (32px, #999999)
- Save as `og-image.png` in the `public/` folder

The SVG provides a basic template that matches your site's design aesthetic.
