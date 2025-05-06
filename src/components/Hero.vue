<template>
  <section id="home" class="max-w-6xl mx-auto min-h-screen flex flex-col justify-center items-center text-center">
    <div class="space-y-6">
      <h1 class="text-5xl md:text-7xl font-bold">
        Hi, I'm
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Joar</span>
      </h1>
      <div class="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300 leading-relaxed">A passionate web developer specializing in creating beautiful and functional websites.</p>
      <div class="flex flex-wrap justify-center gap-3 pt-6">
        <a href="#projects" class="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" @click.prevent="$emit('scroll-to', 'projects')">View my works</a>
        <a href="#contact" class="py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium border border-gray-600 hover:border-gray-500 transition-all duration-300 transform hover:scale-105" @click.prevent="$emit('scroll-to', 'contact')">Get in touch</a>
      </div>
      <div class="pt-16">
        <p class="text-gray-400 mb-4">Tech I work with</p>
        <div class="flex justify-center gap-6 flex-wrap text-3xl">
          <div class="bg-gray-800 text-gray-300 py-2 px-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:text-white transition-all duration-300">
            <i class="devicon-laravel-original colored"></i>
          </div>
          <div class="bg-gray-800 text-gray-300 py-2 px-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:text-white transition-all duration-300">
            <i class="devicon-vuejs-plain colored"></i></div>
          <div class="bg-gray-800 text-gray-300 py-2 px-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:text-white transition-all duration-300">
            <i class="devicon-php-plain colored"></i>
          </div>
          <div class="bg-gray-800 text-gray-300 py-2 px-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:text-white transition-all duration-300">
            <i class="devicon-tailwindcss-original colored"></i>
          </div>
          <div class="bg-gray-800 text-gray-300 py-2 px-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:text-white transition-all duration-300">
            <i class="devicon-bootstrap-plain colored"></i></div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-10 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script>
  export default {};
</script>
