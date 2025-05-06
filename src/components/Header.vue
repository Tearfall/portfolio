<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 py-2">
    <nav class="max-w-6xl mx-auto bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 shadow-lg transition-all duration-300">
      <div class="flex justify-between items-center">
        <div class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Joar.dev</div>
        <div class="hidden md:flex space-x-8">
          <a href="#home" class="text-gray-300 hover:text-white font-medium px-2 py-1 transition-colors duration-300 border-b-2 border-transparent hover:border-blue-500" @click.prevent="$emit('scroll-to', 'home')">Home</a>
          <a href="#about" class="text-gray-300 hover:text-white font-medium px-2 py-1 transition-colors duration-300 border-b-2 border-transparent hover:border-blue-500" @click.prevent="$emit('scroll-to', 'about')">About</a>
          <a href="#projects" class="text-gray-300 hover:text-white font-medium px-2 py-1 transition-colors duration-300 border-b-2 border-transparent hover:border-blue-500" @click.prevent="$emit('scroll-to', 'projects')">Projects</a>
          <a href="#contact" class="text-gray-300 hover:text-white font-medium px-2 py-1 transition-colors duration-300 border-b-2 border-transparent hover:border-blue-500" @click.prevent="$emit('scroll-to', 'contact')">Contact</a>
        </div>
        <button class="md:hidden focus:outline-none" @click="$emit('toggle-mobile-menu')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-if="mobileMenuOpen" class="md:hidden pt-4 pb-2 space-y-2">
        <a href="#home" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors" @click="$emit('toggle-mobile-menu')">Home</a>
        <a href="#about" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors" @click="$emit('toggle-mobile-menu')">About</a>
        <a href="#projects" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors" @click="$emit('toggle-mobile-menu')">Projects</a>
        <a href="#contact" class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors" @click="$emit('toggle-mobile-menu')">Contact</a>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    props: {
      mobileMenuOpen: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
