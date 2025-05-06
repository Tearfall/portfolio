<template>
  <div class="max-w-6xl" v-if="project">
    <div class="overflow-hidden">
      <div>
         <h3 class="text-3xl md:text-4xl font-bold relative">
          {{ project.title }}
          <div class="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-3"></div>
        </h3>

        <div class="flex flex-wrap gap-2 mt-4" v-if="project.tags">
          <span 
            v-for="(tag, index) in project.tags" 
            :key="index" 
            class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex flex-wrap gap-2 mt-4" v-if="project.tags">
          <p class="text-lg text-white leading-relaxed">{{ project.description }}</p>
        </div>
      </div>
      
      <div class=" md:grid md:grid-cols-3 md:gap-8 mt-4">
        <div class="rounded-lg overflow-hidden mb-6 md:mb-0 col-span-2">
          <img 
            :src="project.image" 
            :alt="project.title" 
            class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <div class="space-y-6 col-span-1 flex flex-col justify-between">
          
          
          <div v-if="project.technologies" class="space-y-3">
            <h3 class="text-xl font-semibold text-white">Technologies Used</h3>
            <ul class="flex flex-wrap gap-2">
              <li 
                v-for="(tech, index) in project.technologies" 
                :key="index"
                class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {{ tech }}
              </li>
            </ul>
          </div>
          
          <div class="flex flex-wrap gap-4 pt-4">
            <a 
              :href="project.link" 
              target="_blank" 
              class="inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-medium rounded-md transition-all hover:bg-blue-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
            >
              View Live Project
            </a>
            <a 
              v-if="project.github" 
              :href="project.github" 
              target="_blank" 
              class="inline-flex items-center justify-center px-5 py-3 bg-gray-700 text-gray-100 font-medium rounded-md transition-all hover:bg-gray-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 w-full"
            >
              View Source Code
            </a>
            <a 
              v-if="project.design" 
              :href="project.design" 
              target="_blank" 
              class="inline-flex items-center justify-center px-5 py-3 bg-gray-700  text-gray-100 font-medium rounded-md transition-all hover:bg-gray-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 w-full"
            >
              View Design
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewProject',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>