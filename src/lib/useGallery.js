import { ref } from 'vue'
import { galleryOf } from './portfolioHelpers'

// Shared lightbox state. Each theme calls this once and drops a
// <ProjectGallery> into its template — see any Theme*.vue for the pattern.
export function useGallery() {
  const galleryOpen = ref(false)
  const galleryImages = ref([])
  const galleryTitle = ref('')

  function openGallery(project) {
    const images = galleryOf(project)
    if (!images.length) return
    galleryImages.value = images
    galleryTitle.value = project.title || ''
    galleryOpen.value = true
  }

  function closeGallery() {
    galleryOpen.value = false
  }

  return { galleryOpen, galleryImages, galleryTitle, openGallery, closeGallery }
}
