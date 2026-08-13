export function techList(str) {
  return (str || '').split(',').map((t) => t.trim()).filter(Boolean)
}

export function groupSkillsByCategory(skills) {
  const groups = {}
  for (const s of skills) {
    const cat = s.category || 'General'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(s)
  }
  return groups
}
