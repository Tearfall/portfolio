<template>
  <div class="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen font-sans text-gray-100">
    <Header :mobileMenuOpen="mobileMenuOpen" @toggle-mobile-menu="toggleMobileMenu" @scroll-to="scrollToSection" />
    <main class="pt-24 pb-12 px-4">
      <Hero @scroll-to="scrollToSection"/>
      <About @scroll-to="scrollToSection"/>
      <Techs @scroll-to="scrollToSection" />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  import Hero from "./components/Hero.vue";
  import About from "./components/About.vue";
  import Techs from "./components/Techs.vue";
  import Projects from "./components/Projects.vue";
  import Contact from "./components/Contact.vue";
  import Footer from "./components/Footer.vue";

  export default {
    name: "Portfolio",
    components: {
      Header,
      Hero,
      About,
      Techs,
      Projects,
      Contact,
      Footer,
    },
    data() {
      return {
        mobileMenuOpen: false,
      };
    },
    methods: {
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
      },
      scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 20; 
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      },
    },
  };
</script>

<style>
  /* Custom animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
    
  .delay-100 {
    animation-delay: 100ms;
  }
  .delay-200 {
    animation-delay: 200ms;
  }
  .delay-300 {
    animation-delay: 300ms;
  }
  .delay-400 {
    animation-delay: 400ms;
  }
  .delay-500 {
    animation-delay: 500ms;
  }
</style>
