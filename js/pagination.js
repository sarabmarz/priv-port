// List of project pages inside the "projects" folder
const projectPages = [
  "project1.html",
  "project2.html",
  "project3.html",
  "project4.html",
  "project5.html"
];

// Get the current page filename
const currentPage = window.location.pathname.split("/").pop();

// Find the current project's index
const currentIndex = projectPages.indexOf(currentPage);

if (currentIndex !== -1) {
  const prevIndex = currentIndex === 0 ? projectPages.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projectPages.length - 1 ? 0 : currentIndex + 1;

  // Select pagination container
  const paginationContainer = document.querySelector(".pagination-single");

  if (paginationContainer) {
    paginationContainer.innerHTML = `
      <div class="filter-wrapper">
        <a href="${projectPages[prevIndex]}" class="text-filter">Previous</a>
      </div>
      <div class="filter-wrapper-right">
        <a href="${projectPages[nextIndex]}" class="text-filter">Next</a>
      </div>
    `;
  }
}
