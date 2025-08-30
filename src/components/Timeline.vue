<template>
  <!-- Experience Timeline Section -->
  <section id="experience" class="max-w-6xl mx-auto py-24">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 relative">
      My Experience
      <div class="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-3 mx-auto">
      </div>
    </h2>

    <!-- Timeline Container -->
    <div class="relative">
      <!-- Vertical Line -->
      <div
        class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full">
      </div>

      <!-- Timeline Items -->
      <div class="space-y-5">
        <!-- Experience Item 1 -->
        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <!-- Date Badge - Left side on desktop, top on mobile -->
          <div class="md:text-right order-1 md:order-1">
            <div class="inline-block relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70 scale-110">
              </div>
              <div
                class="relative py-2 px-6 bg-gray-900 bg-opacity-90 rounded-full border-2 border-blue-400 shadow-lg">
                <span class="text-lg font-semibold text-white">January 2025 - Present</span>
              </div>

            </div>

            <!-- Content for desktop - left side -->
            <div class="hidden md:block mt-8">
              <div class="relative mr-10 group">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-sm opacity-100">
                </div>
                <div class="relative p-[2px] rounded-2xl rounded-tr-sm overflow-hidden">
                  <div class="bg-gray-900 bg-opacity-80 p-6 rounded-xl rounded-tr-none">
                    <h4 class="text-xl font-bold text-white mb-2">
                      Junior Software Engineer | July
                      2025 - Present
                    </h4>
                    <div class="d-flex flex-row mb-2">
                      <span class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium m-2">Backend Developer Apprentice</span>
                      <span class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">April 2025 - July 2025</span>
                    </div>
                    <div class="d-flex flex-row mb-2">
                      <span class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium m-2">Intern</span>
                      <span class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">January 2025 - March 2025</span>
                    </div>
                    <h4 class="text-lg font-medium text-blue-400 mb-4">GoodStrings Inc.</h4>
                    <p class="text-gray-300 leading-relaxed text-start">
                      • Engineered and improved the email chat feature for client CRM systems,
                      leading to more efficient client communication. <br />
                      • Developed a bulk import of data feature and an export-to-PDF and Excel
                      functionality, enhancing data management capabilities. <br />
                      • Designed and developed responsive and user-friendly interfaces, improving
                      overall user experience. <br />
                      • Utilized Query Builder and Eloquent ORM to implement full CRUD operations
                      for new system features. <br />
                      • Engineered database queries through Eloquent ORM to optimize data retrieval,
                      improving system performance. <br />
                      • Collaborated with team members to debug and resolve critical system bugs and
                      issues within existing CRM architecture. <br />
                      • Performed manual QA testing on the company's platform and fixed front-end
                      and back-end issues within assigned systems. <br />
                      • Developed a simple income-expense tracker web application using Laravel and
                      Vue.js as an independent project.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-4">
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Laravel</span>
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Vue</span>
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">PHP</span>
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Html</span>
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">CSS</span>
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Javascript</span>
                      <span
                        class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Bootstrap</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Circle in the middle -->
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-900 border-4 border-purple-500 shadow-lg z-10">
          </div>

          <div class="md:hidden mt-8 order-2">
            <div class="relative group">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-100">
              </div>
              <div class="relative p-[2px] rounded-2xl overflow-hidden">
                <div class="bg-gray-900 bg-opacity-80 p-6 rounded-xl">
                  <h3 class="text-xl font-bold text-white mb-2">Backend Developer Apprentice</h3>
                  <h4 class="text-lg font-medium text-blue-400 mb-4">GoodStrings Inc.</h4>
                  <p class="text-gray-300 leading-relaxed">
                    • Utilized both Query Builder and Eloquent ORM to implement CRUD operations for
                    new system features
                    <br />
                    • Designed and developed custom features for client CRM systems
                    <br />
                    • Debugged and resolved issues within existing CRM architecture
                    <br />
                    • Engineered database queries through Eloquent ORM to optimize data retrieval
                    <br />
                    • Collaborated with team members to identify and fix critical system bugs.
                  </p>

                  <div class="flex flex-wrap gap-2 mt-4">
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Laravel</span>
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Vue</span>
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">PHP</span>
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Html</span>
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">CSS</span>
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Javascript</span>
                    <span
                      class="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">Bootstrap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right side on desktop (empty for first item) -->
          <div class="hidden md:block order-2"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Timeline",
};
</script>
