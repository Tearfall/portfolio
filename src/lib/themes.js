export const THEMES = [
  {
    id: 'a',
    label: 'Warm editorial',
    description: 'Cream page, serif headline, rounded pill buttons and project cards.',
    guide: 'Background = page cream. Surface = card fill. Ink = headline & body text. Accent = highlighted word + tags. Accent 2 = primary button fill.',
  },
  {
    id: 'b',
    label: 'Structural grid',
    description: 'Bold uppercase headline, monospace labels, ruled stat bar and work list.',
    guide: 'Background = page fill. Ink = headline, rules and text. Accent = index labels, role line and metadata. Surface / Accent 2 unused.',
  },
  {
    id: 'c',
    label: 'Dark split',
    description: 'Dark sidebar nav next to a deep panel, serif headline, ruled project rows.',
    guide: 'Ink = both dark panels. Background = light text on dark. Accent = nav highlight + tags. Accent 2 = name highlight word.',
  },
  {
    id: 'd',
    label: 'Playful organic',
    description: 'Bright page with floating color blobs, centered avatar and pill tags.',
    guide: 'Background = page fill. Accent = blob + sparkle color + pill tag text. Accent 2 = second blob. Ink = headline & pill fill.',
  },
  {
    id: 'e',
    label: 'Minimal centered',
    description: 'Quiet centered layout, single accent line, restrained type.',
    guide: 'Background = page fill. Surface = thumbnail fallback. Ink = headline & text. Accent = kicker, divider, links, tech tags.',
  },
  {
    id: 'f',
    label: 'Bauhaus blocks',
    description: 'Full-bleed grid of solid color tiles, bold graphic and poster-like.',
    guide: 'Ink = hero + footer tiles. Accent & Accent 2 = alternating tile fills (shades are auto-derived). Background = page gutter. Surface unused.',
  },
]

export function themeById(id) {
  return THEMES.find((t) => t.id === id) || THEMES.find((t) => t.id === 'e')
}
