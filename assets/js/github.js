const GITHUB_USERNAME = "Sofia-bit-2025";
const MAX_REPOSITORIES = 6;

const githubStatus = document.querySelector("#github-status");
const githubRepositories = document.querySelector(
  "#github-repositories",
);

const githubApiUrl =
  `https://api.github.com/users/${GITHUB_USERNAME}/repos` +
  `?sort=updated&direction=desc&per_page=${MAX_REPOSITORIES}`;

const clearStatusClasses = () => {
  if (!githubStatus) {
    return;
  }

  githubStatus.classList.remove(
    "api-status--success",
    "api-status--error",
  );
};

const showLoadingStatus = () => {
  if (!githubStatus) {
    return;
  }

  clearStatusClasses();

  githubStatus.textContent = "GitHub-gegevens laden...";
};

const showSuccessStatus = (repositoryCount) => {
  if (!githubStatus) {
    return;
  }

  clearStatusClasses();

  githubStatus.classList.add("api-status--success");

  if (repositoryCount === 1) {
    githubStatus.textContent =
      "1 recente publieke repository geladen.";
    return;
  }

  githubStatus.textContent =
    `${repositoryCount} recente publieke repositories geladen.`;
};

const showErrorStatus = () => {
  if (!githubStatus) {
    return;
  }

  clearStatusClasses();

  githubStatus.classList.add("api-status--error");

  githubStatus.textContent =
    "GitHub-gegevens konden niet worden geladen. " +
    "Gebruik de GitHub-link hierboven om mijn repositories te bekijken.";
};

const formatUpdatedDate = (dateString) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const createRepositoryTitle = (repository) => {
  const title = document.createElement("h3");

  const link = document.createElement("a");
  link.href = repository.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name;
  link.setAttribute(
    "aria-label",
    `Bekijk ${repository.name} op GitHub`,
  );

  title.appendChild(link);

  return title;
};

const createRepositoryDescription = (repository) => {
  const description = document.createElement("p");

  description.textContent =
    repository.description ||
    "Geen beschrijving beschikbaar.";

  return description;
};

const createRepositoryTags = (repository) => {
  const tagList = document.createElement("ul");
  tagList.className = "tag-list";
  tagList.setAttribute(
    "aria-label",
    `Informatie over ${repository.name}`,
  );

  if (repository.language) {
    const languageItem = document.createElement("li");

    languageItem.className = "tag";
    languageItem.textContent = repository.language;

    tagList.appendChild(languageItem);
  }

  const updatedItem = document.createElement("li");

  updatedItem.className = "tag";
  updatedItem.textContent =
    `Bijgewerkt ${formatUpdatedDate(repository.updated_at)}`;

  tagList.appendChild(updatedItem);

  return tagList;
};

const createRepositoryCard = (repository) => {
  const listItem = document.createElement("li");

  const article = document.createElement("article");
  article.className = "card";

  const title = createRepositoryTitle(repository);
  const description =
    createRepositoryDescription(repository);
  const tags = createRepositoryTags(repository);

  article.append(
    title,
    description,
    tags,
  );

  listItem.appendChild(article);

  return listItem;
};

const renderRepositories = (repositories) => {
  if (!githubRepositories) {
    return;
  }

  githubRepositories.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (const repository of repositories) {
    fragment.appendChild(
      createRepositoryCard(repository),
    );
  }

  githubRepositories.appendChild(fragment);
};

const getPublicRepositories = async () => {
  const response = await fetch(githubApiUrl, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API gaf status ${response.status}.`,
    );
  }

  return response.json();
};

const loadGitHubRepositories = async () => {
  if (!githubStatus || !githubRepositories) {
    return;
  }

  showLoadingStatus();

  try {
    const repositories =
      await getPublicRepositories();

    renderRepositories(repositories);
    showSuccessStatus(repositories.length);
  } catch (error) {
    githubRepositories.replaceChildren();
    showErrorStatus();

    console.error(
      "GitHub repositories laden mislukt:",
      error,
    );
  }
};

loadGitHubRepositories();