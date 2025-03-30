const projects = [
  {
    id: "project1",
    title: "Run Santa Run!",
    type: "Games",
    year: "2024",
    language: "Unity / OpenCV",
    description: "testing",
  },
  {
    id: "project2",
    title: "Phantom",
    type: "Games",
    year: "2023",
    language: "Java",
    description: "testing",
  },
  {
    id: "project3",
    title: "Another Great Project",
    type: "Web Projects",
    year: "2022",
    language: "Unity",
    description: "This is a detailed description of Another Great Project.",
  },
  {
    id: "project4",
    title: "Another Great Project",
    type: "Web Projects",
    year: "2022",
    language: "Unity",
    description: "This is a detailed description of Another Great Project.",
  },
];

let projectsPerPage = 6; // Number of projects per page
let currentPage = 1;
let filteredProjects = [...projects]; // Start with all projects

// Function to generate project cards for the current page
function generateProjectCards(page = 1) {
  const projectsContainer = document.querySelector(".projects-cards");
  projectsContainer.innerHTML = ""; // Clear existing projects

  const start = (page - 1) * projectsPerPage;
  const end = page * projectsPerPage;
  const visibleProjects = filteredProjects.slice(start, end);

  visibleProjects.forEach((project, index) => {
    const projectPage = `projects/project${index + 1}.html`; // Include folder path

    const card = document.createElement("div");
    card.classList.add(
      "project-card",
      project.type.toLowerCase().replace(" ", "-")
    );

    card.innerHTML = `
      <div class="card-hover">
        <a href="${projectPage}" class="button"> <!-- Now correctly points to the folder -->
          <div class="text-filter">SEE MORE</div>
        </a>
      </div>
      <div class="project-image"></div>
      <div class="card-info">
        <div class="title-project">
          <div class="project-title-div">
            <div class="title-text">${project.title}</div>
          </div>
          <div class="type">
            <div class="project-type">${project.type}</div>
          </div>
        </div>
        <div class="year-language">
          <div class="date">
            <div class="year-language-text">${project.year}</div>
          </div>
          <div class="language">
            <div class="language-text">${project.language}</div>
          </div>
        </div>
      </div>
    `;

    projectsContainer.appendChild(card);
  });
}

// Function to filter project cards
function filterProjects(filter) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    if (filter === "all" || card.classList.contains(filter)) {
      card.style.display = "flex"; // Show the card
    } else {
      card.style.display = "none"; // Hide the card
    }
  });
}

// Add event listeners to filter buttons
function setupFilters() {
  const filters = document.querySelectorAll(".filter-wrapper");
  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      const filterType = e.target.textContent.toLowerCase().replace(" ", "-");
      filterProjects(filterType);
    });
  });
}

// Function to setup pagination
function setupPagination() {
  const paginationContainer = document.querySelector(".pagination");
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  paginationContainer.innerHTML = ""; // Clear existing pagination

  // Add "Previous" button
  const prevButton = document.createElement("div");
  prevButton.classList.add("filter-wrapper");
  prevButton.innerHTML = `<div class="text-filter">Previous</div>`;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      generateProjectCards(currentPage);
      updatePaginationState();
      scrollToFixedPosition(); // Scroll to fixed position
    }
  });
  paginationContainer.appendChild(prevButton);

  // Add page numbers
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("div");
    button.classList.add("filter-wrapper");
    button.innerHTML = `<div class="text-filter">${i}</div>`;
    button.addEventListener("click", () => {
      currentPage = i;
      generateProjectCards(currentPage);
      updatePaginationState();
      scrollToFixedPosition(); // Scroll to fixed position
    });
    paginationContainer.appendChild(button);
  }

  // Add "Next" button
  const nextButton = document.createElement("div");
  nextButton.classList.add("filter-wrapper-right");
  nextButton.innerHTML = `<div class="text-filter">Next</div>`;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      generateProjectCards(currentPage);
      updatePaginationState();
      scrollToFixedPosition(); // Scroll to fixed position
    }
  });
  paginationContainer.appendChild(nextButton);

  updatePaginationState();
}

// Function to filter projects
function filterProjects(filter) {
  filteredProjects = projects.filter((project) =>
    filter === "all"
      ? true
      : project.type.toLowerCase().replace(" ", "-") === filter
  );
  currentPage = 1; // Reset to the first page after filtering
  generateProjectCards(currentPage);
  setupPagination();
  scrollToStickyTitle();
}

// Function to highlight the active page in pagination
function updatePaginationState() {
  const buttons = document.querySelectorAll(
    ".pagination .filter-wrapper, .pagination .filter-wrapper-right"
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  buttons.forEach((button, index) => {
    const text = button.textContent.trim().toLowerCase();
    if (text === `${currentPage}`) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }

    // Disable "Previous" and "Next" buttons when not applicable
    if (text === "previous") {
      button.style.pointerEvents = currentPage === 1 ? "none" : "auto";
      button.style.opacity = currentPage === 1 ? "0.5" : "1";
    } else if (text === "next") {
      button.style.pointerEvents = currentPage === totalPages ? "none" : "auto";
      button.style.opacity = currentPage === totalPages ? "0.5" : "1";
    }
  });
}

// Function to scroll to the sticky title
function scrollToStickyTitle() {
  const sectionTitle = document.querySelector(".section-title");
  if (sectionTitle) {
    const offset = 100; // Match the sticky `top` value in CSS
    const titlePosition =
      sectionTitle.getBoundingClientRect().top + window.scrollY;
    setTimeout(() => {
      window.scrollTo({
        top: titlePosition - offset,
        behavior: "smooth",
      });
    }, 10); // Delay ensures DOM updates are applied
  }
}

function scrollToFixedPosition() {
  const fixedScrollPosition = 500; // Replace with your desired fixed value
  window.scrollTo({
    top: fixedScrollPosition,
    behavior: "smooth",
  });
}

// Add event listeners to filter buttons
function setupFilters() {
  const filters = document.querySelectorAll(
    ".filter-wrapper, .filter-wrapper-right"
  );
  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      const filterType = e.target.textContent.toLowerCase().replace(" ", "-");
      filterProjects(filterType);
    });
  });
}

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
  generateProjectCards();
  setupFilters();
  setupPagination();
});

function loadProjectDetails() {
  // Get the current filename (e.g., "project1.html" -> "project1")
  const fileName = window.location.pathname.split("/").pop().split(".")[0];

  // Find the project that matches this filename
  const project = projects.find(proj => proj.id === fileName);

  if (project) {
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-year").textContent = project.year;
    document.getElementById("project-language").textContent = project.language;
    document.getElementById("project-type").textContent = project.type;
    document.getElementById("project-description").textContent = project.description;
} else {
    console.error("Project not found:", projectId);
  }
});

// Run this function when the page loads
document.addEventListener("DOMContentLoaded", loadProjectDetails);
