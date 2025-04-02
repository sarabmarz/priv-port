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
    video: "https://vimeo.com/1043681367",
    titleImage: "../img/projects/project1/title.png"
    images: [
      { src: "../img/projects/project1/1.png", layout: "stacked" },
      { src: "../img/projects/project1/2.png", layout: "flexbox" },
      { src: "../img/projects/project1/3.png", layout: "flexbox" },
      { src: "../img/projects/project1/4.png", layout: "flexbox" },
      { src: "../img/projects/project1/5.png", layout: "flexbox" }
    ]
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
    title: "Forma",
    type: "Games",
    year: "2022",
    language: "Java",
    description: `Forma is an arcade-style game inspired by <a href="https://poki.com/en/g/bubble-trouble">Bubble Trouble</a>. In Forma, you control a Stegosaurus shooting its plates to pop moving geometric shapes in an origami-themed world. The game features infinite levels with progressively dynamic difficulty, as shapes move more unpredictably and are harder to avoid.<br>
Each shape has a unique movement pattern: circles follow a sine wave, triangles a triangular wave, and squares a square wave, all with randomly generated amplitudes. Players have five lives and limited time per level, losing a life if the timer runs out. Pop all shapes to advance without losing all your health or time!<br>
              <ul>
              <li>All design elements in <em>Forma</em> were homemade</li>
              <li>The font used in the game is <a href="https://fonts.google.com/specimen/Delicious+Handrawn">Delicious Handrawn</a></li>
              <li>Music and sound effects were sourced from <a href="https://pixabay.com/">Pixabay</a></li>
            </ul>`,
  },
  {
    id: "project4",
    title: "2048",
    type: "Games",
    year: "2022",
    language: "Python",
    description: `This game was created in two days during the summer break after the first semester of university, inspired by a recommendation from a Discrete Mathematics professor as a great exercise in both logic and programming.

It incorporates concepts like probability (90% chance to generate a 2, 10% for a 4), matrix manipulation for the 4x4 grid, matrix transposition to handle vertical moves, and adjacency checks to combine tiles.`,
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
    const fileName = window.location.pathname.split("/").pop().split(".")[0];
    const project = projects.find(proj => proj.id === fileName);

    if (project) {
        document.getElementById("project-title").textContent = project.title;
        document.getElementById("project-year").textContent = project.year;
        document.getElementById("project-language").textContent = project.language;
        document.getElementById("project-type").textContent = project.type;
        document.getElementById("project-description").innerHTML = project.description;

      // Set the title image dynamically
        const titleImageDiv = document.querySelector(".project-image-single");
        if (titleImageDiv && project.titleImage) {
            titleImageDiv.style.backgroundImage = `url('${project.titleImage}')`;
        }
      
      // Load video
        const videoContainer = document.getElementById("project-video");
        videoContainer.innerHTML = "";
        if (project.video) {
            const iframe = document.createElement("iframe");
            iframe.src = project.video;
            iframe.width = "100%";
            iframe.height = "400px";
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; fullscreen; picture-in-picture";
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
        }

        // Load images dynamically
        const imagesContainer = document.getElementById("project-images");
        imagesContainer.innerHTML = "";

        let flexContainer = null;

        project.images.forEach((image, index) => {
            const img = document.createElement("img");
            img.src = image.src;
            img.alt = project.title;

            if (image.layout === "stacked") {
                const fullWidthDiv = document.createElement("div");
                fullWidthDiv.classList.add("full-width-image");
                fullWidthDiv.appendChild(img);
                imagesContainer.appendChild(fullWidthDiv);
                flexContainer = null; // Reset flex container when switching layouts
            } 
            else if (image.layout === "flexbox") {
                if (!flexContainer) {
                    flexContainer = document.createElement("div");
                    flexContainer.classList.add("flexbox-row");
                    imagesContainer.appendChild(flexContainer);
                }
                flexContainer.appendChild(img);
            }
        });
    } else {
        console.error("Project not found:", fileName);
    }
}


  // Only run on project pages
  if (document.querySelector(".project-title")) {
    loadProjectDetails();
  }
});
