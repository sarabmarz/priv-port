const projects = [
  {
    id: "project1",
    title: "Run Santa Run!",
    type: "Games",
    year: "2024",
    language: "Unity / OpenCV",
    description: `This project is an endless runner game that combines real-time hand gesture control using OpenCV with Unity-based game development. Built for the Image Processing and Vision course, it demonstrates advanced image processing techniques for hand tracking and gesture recognition.
              <ul>
                <li>Design elements are either handmade or from unity store</li>
                <li>The fonts used in the game are <a href="https://fonts.google.com/specimen/Barriecito">Barriecito</a> & <a href="https://fonts.google.com/specimen/Mountains+of+Christmas">Mountains of Chirstmas</a></li>
                <li>Music and sound effects were sourced from <a href="https://pixabay.com/">Pixabay</a></li>
              </ul>`,
  },
  {
    id: "project2",
    title: "Phantom",
    type: "Games",
    year: "2023",
    language: "Java",
    description: `A small game group project done in Java for the Modelling and Simulation of Natural Systems course.<br>
              In this game, you play as a Witch trapped in a haunted map filled with dangerous ghosts. To escape, you must defeat the ghosts, one of which will drop a key. Once you find the key, a portal appears, but the Witch still has to find it.<br>
              The Witch is joined by her loyal Bat Companion and has two magical powers: freezing ghosts to stop them temporarily or electrocuting them to get rid of them for good.<br> 
              
              <strong>Art:</strong>
              <ul>
              <li><a href="https://penzilla.itch.io/hooded-protagonist">Hooded Protagonist</a> (Witch) made by <a href="https://penzilla.itch.io/">Penzilla</a></li>
              <li><a href="https://creationr.itch.io/ghost-enemy-32-x-32">Ghosts</a> made by <a href="https://creationr.itch.io/">creationr</a></li>
              <li><a href="https://eduardscarpato.itch.io/bat-animations-pixel-art-2d-free">Bat Companion</a> made by <a href="https://eduardscarpato.itch.io/">Eduardo Scarpato</a></li>
            </ul>`,
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

document.addEventListener("DOMContentLoaded", function () {
  function loadProjectDetails() {
    // Get the current filename (e.g., "project1.html" -> "project1")
    const fileName = window.location.pathname.split("/").pop().split(".")[0];

    // Find the project that matches this filename
    const project = projects.find(proj => proj.id === fileName);

    if (project) {
      // Check if elements exist before updating them
      const titleElement = document.querySelector(".project-title");
      const yearElement = document.querySelector(".year-text-single");
      const languageElement = document.querySelector(".language-text-single");
      const typeElement = document.querySelector(".text-title-small");
      const descriptionElement = document.querySelector(".description-text");

      if (titleElement) titleElement.textContent = project.title;
      if (yearElement) yearElement.textContent = project.year;
      if (languageElement) languageElement.textContent = project.language;
      if (typeElement) typeElement.textContent = project.type;
      if (descriptionElement) descriptionElement.innerHTML = project.description;
    } else {
      console.error("Project not found:", fileName);
    }
  }

  // Only run on project pages
  if (document.querySelector(".project-title")) {
    loadProjectDetails();
  }
});
