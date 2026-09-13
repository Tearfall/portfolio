import { ref } from 'vue'

// Shared lightbox state. Portfolio.vue calls this once, drops a
// <ProjectGallery> into its template, and hands openGallery the shots.
export function useGallery() {
  const galleryOpen = ref(false)
  const galleryImages = ref([])
  const galleryTitle = ref('')

  function openGallery(images, title = '') {
    if (!images?.length) return
    galleryImages.value = images
    galleryTitle.value = title
    galleryOpen.value = true
  }

  function closeGallery() {
    galleryOpen.value = false
  }

  return { galleryOpen, galleryImages, galleryTitle, openGallery, closeGallery }
}
