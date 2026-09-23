const projects = [
  {
    id: 1,
    title: "Portfolio website",
    description:
      "Semantische HTML-pagina's met responsive CSS en toegankelijke navigatie.",
    category: "web",
    technologies: ["HTML5", "CSS", "Accessibility"],
    status: "Afgerond",
    liveUrl: "https://sofia-bit-2025.github.io/oefening-individueel-wpfw/",
    repositoryUrl:
      "https://sofia-bit-2025.github.io/oefening-individueel-wpfw/",
  },
  {
    id: 2,
    title: "Task manager",
    description:
      "Client-side takenlijst met filteren, sorteren en lokale state.",
    category: "web",
    technologies: ["JavaScript", "DOM API", "CSS"],
    status: "In ontwikkeling",
  },
  {
    id: 3,
    title: "Bibliotheekdatabase",
    description:
      "Relationeel datamodel voor boeken, leden en uitleningen met SQL-queries.",
    category: "database",
    technologies: ["SQL", "PostgreSQL", "ERD"],
    status: "In ontwikkeling",
  },
  {
    id: 4,
    title: "Student grades API",
    description:
      "REST-endpoints voor cijferregistratie met validatie en databasekoppeling.",
    category: "database",
    technologies: ["C#", "ASP.NET Core", "SQL"],
    status: "Gepland",
  },
  {
    id: 5,
    title: "Sentiment analyzer",
    description:
      "Prototype dat tekst classificeert met een eenvoudig machine-learningmodel.",
    category: "ai",
    technologies: ["Python", "scikit-learn", "REST API"],
    status: "In ontwikkeling",
  },
  {
    id: 6,
    title: "Aanbevelingsengine",
    description:
      "Experiment met content-based filtering voor project- en cursussuggesties.",
    category: "ai",
    technologies: ["Python", "Pandas", "NumPy"],
    status: "Gepland",
  },
];

const CATEGORY_ALL = "all";

let selectedCategory = CATEGORY_ALL;
let sortDirection = "asc";

const projectsList = document.querySelector("#projects-list");
const projectsStatus = document.querySelector("#projects-status");
const filterButtons = document.querySelectorAll(".projects-filter__button");
const sortSelect = document.querySelector("#sort-direction");

const filterProjects = (projectList, category) => {
  if (category === CATEGORY_ALL) {
    return projectList;
  }

  return projectList.filter((project) => project.category === category);
};

const sortProjects = (projectList, direction) => {
  return [...projectList].sort((firstProject, secondProject) => {
    const comparison = firstProject.title.localeCompare(
      secondProject.title,
      "nl",
      {
        sensitivity: "base",
      },
    );

    return direction === "desc" ? -comparison : comparison;
  });
};

const getStatusClass = (status) => {
  if (status === "In ontwikkeling") {
    return "status--in-progress";
  }

  if (status === "Gepland") {
    return "status--planned";
  }

  return "";
};

const createProjectActions = (project) => {
  const actions = document.createElement("div");
  actions.className = "card__actions";

  if (project.liveUrl) {
    const liveLink = document.createElement("a");

    liveLink.className = "card__link card__link--primary";
    liveLink.href = project.liveUrl;
    liveLink.target = "_blank";
    liveLink.rel = "noopener noreferrer";
    liveLink.textContent = "Bekijk live site";
    liveLink.setAttribute(
      "aria-label",
      `Bekijk ${project.title} als live site`,
    );

    actions.appendChild(liveLink);
  }

  if (project.repositoryUrl) {
    const repositoryLink = document.createElement("a");

    repositoryLink.className = "card__link";
    repositoryLink.href = project.repositoryUrl;
    repositoryLink.target = "_blank";
    repositoryLink.rel = "noopener noreferrer";
    repositoryLink.textContent = "Bekijk broncode";
    repositoryLink.setAttribute(
      "aria-label",
      `Bekijk broncode van ${project.title}`,
    );

    actions.appendChild(repositoryLink);
  }

  return actions;
};

const createProjectItem = (project) => {
  const listItem = document.createElement("li");

  const article = document.createElement("article");
  article.className = "card";

  const status = document.createElement("p");
  status.className = "status";

  const statusClass = getStatusClass(project.status);

  if (statusClass) {
    status.classList.add(statusClass);
  }

  status.textContent = project.status;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const technologyList = document.createElement("ul");
  technologyList.className = "tag-list";
  technologyList.setAttribute(
    "aria-label",
    `Gebruikte technieken voor ${project.title}`,
  );

  for (const technology of project.technologies) {
    const technologyItem = document.createElement("li");

    technologyItem.className = "tag";
    technologyItem.textContent = technology;

    technologyList.appendChild(technologyItem);
  }

  article.append(status, title, description, technologyList);

  if (project.liveUrl || project.repositoryUrl) {
    article.appendChild(createProjectActions(project));
  }

  listItem.appendChild(article);

  return listItem;
};

const updateProjectsStatus = (numberOfProjects) => {
  if (!projectsStatus) {
    return;
  }

  if (numberOfProjects === 0) {
    projectsStatus.textContent = "Geen projecten gevonden.";
    return;
  }

  const projectLabel =
    numberOfProjects === 1 ? "1 project" : `${numberOfProjects} projecten`;

  const sortLabel = sortDirection === "asc" ? "A tot Z" : "Z tot A";

  projectsStatus.textContent = `${projectLabel} weergegeven, gesorteerd van ${sortLabel}.`;
};

const renderProjects = (projectList) => {
  if (!projectsList) {
    return;
  }

  projectsList.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (const project of projectList) {
    fragment.appendChild(createProjectItem(project));
  }

  projectsList.appendChild(fragment);

  updateProjectsStatus(projectList.length);
};

const updateProjects = () => {
  const filteredProjects = filterProjects(projects, selectedCategory);

  const sortedProjects = sortProjects(filteredProjects, sortDirection);

  renderProjects(sortedProjects);
};

const setActiveFilterButton = (activeButton) => {
  for (const button of filterButtons) {
    const isActive = button === activeButton;

    button.setAttribute("aria-pressed", String(isActive));
  }
};

const handleFilterClick = (event) => {
  const button = event.currentTarget;

  selectedCategory = button.dataset.category ?? CATEGORY_ALL;

  setActiveFilterButton(button);
  updateProjects();
};

const handleSortChange = (event) => {
  sortDirection = event.currentTarget.value;

  updateProjects();
};

const initProjectsPage = () => {
  if (!projectsList || !sortSelect) {
    return;
  }

  for (const button of filterButtons) {
    button.addEventListener("click", handleFilterClick);
  }

  sortSelect.addEventListener("change", handleSortChange);

  updateProjects();
};

initProjectsPage();
