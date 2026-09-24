const projects = [
  {
    id: 1,
    title: "WPFW portfolio",
    description:
      "Portfolio gebouwd met HTML, CSS en JavaScript voor mijn WPFW-opdrachten.",
    technologies: [
      "HTML5",
      "CSS",
      "JavaScript",
      "DOM API",
      "Fetch API",
      "Toegankelijkheid",
    ],
    status: "In ontwikkeling",
    repositoryUrl: "https://github.com/Sofia-bit-2025/wpfw-portfolio-sofia",
    details: [
      "Projectgegevens worden vanuit JavaScript naar de DOM gerenderd.",
      "Het project kan worden gezocht op titel, beschrijving en techniek.",
      "Het contactformulier bevat client-side validatie en toegankelijke feedback.",
      "GitHub-data wordt via de Fetch API opgehaald en dynamisch weergegeven.",
    ],
  },
];

const normalizeText = (value) => {
  return value.trim().toLocaleLowerCase("nl-NL");
};

const projectMatchesSearch = (project, searchTerm) => {
  const normalizedSearchTerm = normalizeText(searchTerm);

  if (normalizedSearchTerm === "") {
    return true;
  }

  const searchableContent = normalizeText(
    [project.title, project.description, ...project.technologies].join(" "),
  );

  return searchableContent.includes(normalizedSearchTerm);
};

const filterProjects = (projectList, searchTerm) => {
  return projectList.filter((project) =>
    projectMatchesSearch(project, searchTerm),
  );
};

const createTechnologyList = (project) => {
  const list = document.createElement("ul");

  list.className = "tag-list";

  list.setAttribute("aria-label", `Gebruikte technieken voor ${project.title}`);

  for (const technology of project.technologies) {
    const item = document.createElement("li");

    item.className = "tag";
    item.textContent = technology;

    list.appendChild(item);
  }

  return list;
};

const createProjectDetails = (project) => {
  const detailsId = `project-details-${project.id}`;

  const wrapper = document.createElement("div");

  const button = document.createElement("button");

  button.type = "button";
  button.className = "card__link";
  button.textContent = "Toon technische details";

  button.setAttribute("aria-expanded", "false");

  button.setAttribute("aria-controls", detailsId);

  const details = document.createElement("div");

  details.className = "project-details";
  details.id = detailsId;
  details.hidden = true;

  const title = document.createElement("h4");

  title.textContent = "Technische details";

  const list = document.createElement("ul");

  for (const detail of project.details) {
    const item = document.createElement("li");

    item.textContent = detail;

    list.appendChild(item);
  }

  details.append(title, list);

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));

    details.hidden = isExpanded;

    button.textContent = isExpanded
      ? "Toon technische details"
      : "Verberg technische details";
  });

  wrapper.append(button, details);

  return wrapper;
};

const createProjectCard = (project) => {
  const listItem = document.createElement("li");

  const article = document.createElement("article");

  article.className = "card";

  const status = document.createElement("p");

  status.className = "status";
  status.textContent = project.status;

  const title = document.createElement("h3");

  title.textContent = project.title;

  const description = document.createElement("p");

  description.textContent = project.description;

  const technologies = createTechnologyList(project);

  const details = createProjectDetails(project);

  const repositoryLink = document.createElement("a");

  repositoryLink.className = "card__link card__link--primary";

  repositoryLink.href = project.repositoryUrl;

  repositoryLink.textContent = "Bekijk broncode op GitHub";

  article.append(
    status,
    title,
    description,
    technologies,
    details,
    repositoryLink,
  );

  listItem.appendChild(article);

  return listItem;
};

const renderProjects = (projectList, projectsListElement) => {
  projectsListElement.replaceChildren();

  for (const project of projectList) {
    projectsListElement.appendChild(createProjectCard(project));
  }
};

const updateProjectsStatus = (statusElement, numberOfProjects, searchTerm) => {
  const isSearching = normalizeText(searchTerm) !== "";

  if (numberOfProjects === 0) {
    statusElement.textContent = `Geen projecten gevonden voor "${searchTerm.trim()}".`;

    return;
  }

  if (!isSearching) {
    statusElement.textContent =
      numberOfProjects === 1
        ? "1 project weergegeven."
        : `${numberOfProjects} projecten weergegeven.`;

    return;
  }

  statusElement.textContent =
    numberOfProjects === 1
      ? "1 project gevonden."
      : `${numberOfProjects} projecten gevonden.`;
};

const updateProjects = (searchTerm, projectsListElement, statusElement) => {
  const visibleProjects = filterProjects(projects, searchTerm);

  renderProjects(visibleProjects, projectsListElement);

  updateProjectsStatus(statusElement, visibleProjects.length, searchTerm);
};

const initProjectsPage = () => {
  const searchInput = document.querySelector("#project-search");

  const projectsListElement = document.querySelector("#projects-list");

  const statusElement = document.querySelector("#projects-status");

  if (!searchInput || !projectsListElement || !statusElement) {
    return;
  }

  searchInput.addEventListener("input", () => {
    updateProjects(searchInput.value, projectsListElement, statusElement);
  });

  updateProjects(searchInput.value, projectsListElement, statusElement);
};

initProjectsPage();
