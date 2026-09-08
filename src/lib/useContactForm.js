import { reactive, ref, computed } from 'vue'

// Submit logic for the contact forms. Each theme writes its own markup and
// styles — this only owns the state machine and the Formspree call, so a fix
// here fixes all six.
//
// `endpoint` may be a string or a getter returning one (profile.formspree_url).
export function useContactForm(endpoint) {
  const form = reactive({ name: '', email: '', subject: '', message: '', _gotcha: '' })
  const status = ref('idle') // idle | sending | sent | error
  const error = ref('')

  const sending = computed(() => status.value === 'sending')
  const sent = computed(() => status.value === 'sent')

  function reset() {
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    form._gotcha = ''
  }

  // Back to a blank form after a successful send.
  function again() {
    status.value = 'idle'
    error.value = ''
  }

  async function submit() {
    const url = typeof endpoint === 'function' ? endpoint() : endpoint
    if (!url || sending.value) return

    status.value = 'sending'
    error.value = ''

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        reset()
        status.value = 'sent'
        return
      }

      // Formspree explains validation problems ("Email is invalid") — worth
      // showing verbatim. Anything else (offline, DNS, CORS) is not.
      const data = await res.json().catch(() => null)
      const detail = data?.errors?.map((e) => e.message).filter(Boolean).join(', ')
      const err = new Error(detail || 'That did not go through. Please try again.')
      err.fromServer = true
      throw err
    } catch (e) {
      status.value = 'error'
      error.value = e.fromServer
        ? e.message
        : "Couldn't send just now — please try again, or email me directly."
    }
  }

  return { form, status, error, sending, sent, submit, again }
}
