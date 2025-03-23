// List of project pages inside the "projects" folder
const projectPages = [
  "project1.html",
  "project2.html",
  "project3.html",
  "project4.html",
  "project5.html",
];

// Get the current page filename (without the full path)
const currentPage = window.location.pathname.split("/").pop();

// Find the current project's index in the array
const currentIndex = projectPages.indexOf(currentPage);

if (currentIndex !== -1) {
  // Determine Previous and Next Projects
  const prevIndex =
    currentIndex === 0 ? projectPages.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === projectPages.length - 1 ? 0 : currentIndex + 1;

  // Select the pagination container
  const paginationContainer = document.querySelector(".pagination-single");
  paginationContainer.innerHTML = `
    <div class="filter-wrapper">
      <a href="../projects/${projectPages[prevIndex]}" class="text-filter">Previous</a>
    </div>
    <div class="filter-wrapper-right">
      <a href="../projects/${projectPages[nextIndex]}" class="text-filter">Next</a>
    </div>
  `;
}
