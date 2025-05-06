<template>
  <!-- Projects Section -->
  <section id="projects" class="max-w-6xl mx-auto py-24">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold">My Projects</h2>
      <div class="h-1 w-20 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-3 mb-6"></div>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">Here are some of my recent projects. Each one presented unique challenges that helped me grow as a developer.</p>
    </div>

    <!-- Project Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
      <div class="col-span-1 flex items-start justify-center">
        <ul class="flex-grow-1 flex gap-2 flex-col">
          <li v-for="(project, i) in projects" :key="i" class="text-center text-md font-bold cursor-pointer" @click="selectProject(project)">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 inset-0 rounded-xl opacity-100 p-[2px]">
              <span :class="['block p-2 rounded-xl transition-all duration-300', selectedProject && selectedProject.title === project.title ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-900 bg-opacity-80 hover:bg-gray-800']">
                {{ project.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-span-1 md:col-span-3 lg:col-span-3 flex items-start justify-center">
        <ViewProject :project="selectedProject" class="mb-8" />
      </div>
    </div>
  </section>
</template>

<script>
  import nerdiCover from "@/assets/nerdi/nerdi.png"; 
  import talosCover from "@/assets/talos/ProjectionHistory.png"; 
  import promeeCover from "@/assets/promee/promee.png"; 
  import ViewProject from "./ViewProject.vue";
  import {ref, onMounted} from "vue";
  export default {
    name: "Projects",
    components: {
      ViewProject,
    },
    setup() {
      const projects = [
        {
          title: "Talos",
          description: "Data visualization and analytics platform for institution's strategic planning.",
          tags:["Web App",  "Data Visualization", "Analytics"],
          image: talosCover,
          technologies: ["Vue", "Javascript", "Tailwind", "Firebase"],
          liveLink: "#",
          github: "#",
          design:"#"
        },
        {
          title: "Nerdi",
          description: "A mobile studying tool for students with interactive flashcards and quizzes.",
          tags:["Mobile App", "Flashcards", "Quizzes"],
          image: nerdiCover,
          technologies: ["Android Studio", "Firebase", "Java"],
          liveLink: "#",
          github: "#",
          design:"#"
        },
        {
          title: "Promee",
          description: "A task management tool integrated with Kanban board and 3-2-1 productivity rule for improved self-productivity and project management.",
          tags:["Mobile App", "Task Management", "Kanban"],
          image: promeeCover,
          technologies: ["Android Studio", "Firebase", "Java"],
          liveLink: "#",
          github: "#",
          design:"#"
        },
        {
          title: "Mitolohiya",
          tags:["Mobile Game", "2D", "Top-down"],
          description: "A mobile game based on Philippine Mythology.",
          image: "path/to/image3.jpg",
          technologies: ["Unity", "C#"],
          liveLink: "#",
          github: "#",
          design:"#"
        },
      ];
      const selectedProject = ref(projects[0]); 

      function selectProject(project) {
        selectedProject.value = project;
      }

      onMounted(() => {
        if (selectedProject.value === null && props.projects && props.projects.length > 0) {
          selectProject(props.projects[0]);
        }
      });

      return {
        selectedProject,
        selectProject,
        projects,
      };
    },
    mounted() {
      if (this.projects && this.projects.length > 0) {
        this.selectProject(this.projects[0]);
      }
    },
  };
</script>
