<template>
  <!-- Contact Section with integrated form success component -->
  <section id="contact" class="max-w-6xl mx-auto py-24">
    <div class="grid md:grid-cols-2 gap-12">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold">Get In Touch</h2>
        <div class="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-3 mb-6"></div>
        <p class="text-lg text-gray-300 leading-relaxed">Interested in working together? Feel free to reach out! I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

        <!-- Contact Info -->
        <div class="mt-8 space-y-4">
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              <i class="pi pi-envelope"></i>
            </div>
            <span>crisostomo.mavijoar2003@gmail.com</span>
          </div>
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              <i class="pi pi-phone"></i>
            </div>
            <span>+63 994 418 5812</span>
          </div>
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              <i class="pi pi-map-marker"></i>
            </div>
            <span>Cavite, Philippines</span>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold mb-4">Connect with me</h3>
          <div class="flex gap-4">
            <a href="#" class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
              <!-- GitHub icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="#" class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
              <!-- LinkedIn icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
              <!-- Instagram icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Send Me a Message</h3>
        <form v-if="!formSubmitted" class="space-y-4" id="contactForm" @submit.prevent="submitForm">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input type="text" v-model="formData.name" name="name" id="name" required class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your name" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email</label>
            <input type="email" v-model="formData.email" name="email" id="email" required class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your email" />
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium mb-1">Subject</label>
            <input type="text" v-model="formData.subject" name="subject" id="subject" required class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Subject" />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium mb-1">Message</label>
            <textarea v-model="formData.message" name="message" id="message" required rows="5" class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Your message"></textarea>
          </div>
          <button type="submit" :disabled="isSubmitting" class="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>Send Message</span>
          </button>
        </form>
        
        <!-- Form Success Component - Shown after successful submission -->
        <div v-if="formSubmitted" class="form-success-container">
          <div class="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-6 rounded-lg border border-green-500/30 text-center">
            <div class="mb-4 flex justify-center">
              <div class="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-green-400 mb-2">Message Sent Successfully!</h3>
            <p class="text-gray-300 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button @click="resetForm" class="py-2 px-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02]">
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const formData = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    const formSubmitted = ref(false);
    const isSubmitting = ref(false);
    
    const submitForm = async () => {
      try {
        isSubmitting.value = true;
        
        // Form submission to Formspree (you can use the action URL from your original form)
        const response = await fetch('https://formspree.io/f/mblojogz', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.value)
        });
        
        if (response.ok) {
          // If form submission is successful, show success message
          formSubmitted.value = true;
        } else {
          // Handle form submission error
          console.error('Form submission failed');
          alert('There was an error submitting your form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again.');
      } finally {
        isSubmitting.value = false;
      }
    };
    
    const resetForm = () => {
      // Reset the form to allow another submission
      formData.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      formSubmitted.value = false;
    };
    
    return {
      formData,
      formSubmitted,
      isSubmitting,
      submitForm,
      resetForm
    };
  }
};
</script>

<style>
.form-success-container {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>