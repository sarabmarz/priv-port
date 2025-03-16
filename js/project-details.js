const hash = window.location.hash; 
const slug = hash.startsWith("#/projects/") ? hash.replace("#/projects/", "") : "";


// Find the project by slug
const projectIndex = projects.findIndex((proj) => proj.slug === slug);
const project = projects[projectIndex];

function generateProjectCardSingle(project) {
  if (!project) {
    document.querySelector(".project-card-single").innerHTML = `
      <h1>Project Not Found</h1>
      <a href="/" class="button">Back to Projects</a>
    `;
    return;
  }

  const projectCardContainer = document.querySelector(".project-card-single");
  projectCardContainer.innerHTML = `
    <div class="card-hover">
      <a href="/" class="button">
        <div class="text-filter">BACK TO PROJECTS</div>
      </a>
    </div>
    <div class="project-image" style="background-image: url('${project.image}');"></div>
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
      <div class="description">
        <p>${project.description}</p>
      </div>
    </div>
  `;

  // Generate Previous / Next navigation
  generateProjectNavigation(projectIndex);
}

// Function to generate Previous / Next navigation
function generateProjectNavigation(index) {
  const navContainer = document.createElement("div");
  navContainer.classList.add("pagination"); // Match the pagination class from index.html

  // Determine Previous & Next projects
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  // Create "Previous" button
  if (prevProject) {
    const prevButton = document.createElement("div");
    prevButton.classList.add("filter-wrapper");
    prevButton.innerHTML = `<div class="text-filter">Previous</div>`;
    prevButton.addEventListener("click", () => {
      window.location.hash = `#/projects/${prevProject.slug}`;
      location.reload(); // Reload to fetch new project details
    });
    navContainer.appendChild(prevButton);
  }

  // Create "Next" button
  if (nextProject) {
    const nextButton = document.createElement("div");
    nextButton.classList.add("filter-wrapper-right");
    nextButton.innerHTML = `<div class="text-filter">Next</div>`;
    nextButton.addEventListener("click", () => {
      window.location.hash = `#/projects/${nextProject.slug}`;
      location.reload(); // Reload to fetch new project details
    });
    navContainer.appendChild(nextButton);
  }

  // Append navigation after the project card, before the credits
  document.querySelector(".project-card-single").after(navContainer);
}

// Update Project Type Title at the top
if (project) {
  document.querySelector(".text-title-small").textContent = project.type;
}

// Generate the project details dynamically
generateProjectCardSingle(project);
