<template>
  <!-- About Section -->
  <section id="about" class="max-w-6xl mx-auto py-24">
    <div class="grid md:grid-cols-2 gap-12 items-center">
  
      <div class="flex justify-center items-center">
        <div class="relative">

          <div class="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 scale-110"></div>
      
          <div class="relative rounded-full overflow-hidden border-4 border-gray-700 shadow-lg h-64 w-64 md:h-80 md:w-80">
            <img src="@/assets/profile.jpg" alt="Joar's profile picture" class="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <!-- About Content -->
      <div class="space-y-6">
        <h2 class="text-3xl md:text-4xl font-bold relative">
          About Me
          <div class="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-3"></div>
        </h2>

        <div class="relative mr-10 group">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tl-sm opacity-100"></div>
          <div class="relative p-[2px] rounded-2xl rounded-tl-sm overflow-hidden">
            <div class="bg-gray-900 bg-opacity-80 p-4 rounded-xl rounded-tl-none">
              <p class="text-lg text-gray-300 leading-relaxed">I am a soon-to-graduate computer science student with a strong foundation in programming and web development. I have experience in building responsive and user-friendly websites using modern technologies.</p>
            </div>
          </div>
        </div>

        <div class="relative ml-10 group">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl rounded-tr  -sm opacity-100"></div>
          <div class="relative p-[2px] rounded-2xl rounded-tr-sm overflow-hidden">
            <div class="bg-gray-900 bg-opacity-80 p-4 rounded-xl rounded-tr-none">
              <p class="text-lg text-gray-300 leading-relaxed">During my academic career, I specialized in front-end development and UI/UX design. While this remains my primary strength, I'm actively expanding my skills into backend development to become a more versatile developer.</p>
            </div>
          </div>
        </div>

        <div class="relative mr-10 group">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tl-sm opacity-100"></div>
          <div class="relative p-[2px] rounded-2xl rounded-tl-sm overflow-hidden">
            <div class="bg-gray-900 bg-opacity-80 p-4 rounded-xl rounded-tl-none">
              <p class="text-lg text-gray-300 leading-relaxed">My goal is to create seamless user experiences that are both functional and visually appealing.</p>
            </div>
          </div>
        </div>

        <a href="#contact" class="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block mt-4" @click.prevent="$emit('scroll-to', 'contact')">Let's work together</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  };
</script>
