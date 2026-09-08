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

// Images for a project's lightbox: its `gallery` if it has one, otherwise just
// the cover. Returns [] for a project with no images at all.
export function galleryOf(project) {
  if (project?.gallery?.length) return project.gallery
  return project?.image_url ? [project.image_url] : []
}

// The one outbound link a project card should offer, or '' if it has none.
export function projectLink(project) {
  return project?.project_url || project?.repo_url || project?.design_url || ''
}

// "+63 994 418 5812" -> "tel:+639944185812"
export function telHref(phone) {
  return phone ? 'tel:' + phone.replace(/[^\d+]/g, '') : ''
}
