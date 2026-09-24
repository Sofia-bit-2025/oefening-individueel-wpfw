const GITHUB_API_URL =
  "https://api.github.com/repos/Sofia-bit-2025/wpfw-portfolio-sofia";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Datum onbekend";
  }

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const isValidRepository = (repository) => {
  return (
    repository &&
    typeof repository === "object" &&
    typeof repository.name === "string" &&
    typeof repository.html_url === "string" &&
    typeof repository.updated_at === "string"
  );
};

const fetchRepository = async () => {
  const response = await fetch(GITHUB_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const repository = await response.json();

  if (!isValidRepository(repository)) {
    throw new Error("Onverwachte GitHub API-response.");
  }

  return repository;
};

const createRepositoryCard = (repository) => {
  const listItem = document.createElement("li");

  const article = document.createElement("article");
  article.className = "card";

  const title = document.createElement("h3");

  const link = document.createElement("a");
  link.href = repository.html_url;
  link.textContent = repository.name;

  title.appendChild(link);

  const description = document.createElement("p");
  description.textContent =
    repository.description ||
    "Geen beschrijving beschikbaar.";

  const information = document.createElement("ul");
  information.className = "tag-list";

  information.setAttribute(
    "aria-label",
    `Repositoryinformatie voor ${repository.name}`,
  );

  if (repository.language) {
    const language = document.createElement("li");

    language.className = "tag";
    language.textContent = repository.language;

    information.appendChild(language);
  }

  const updated = document.createElement("li");

  updated.className = "tag";
  updated.textContent =
    `Bijgewerkt ${formatDate(repository.updated_at)}`;

  information.appendChild(updated);

  article.append(
    title,
    description,
    information,
  );

  listItem.appendChild(article);

  return listItem;
};

const renderRepository = (
  repositoryListElement,
  repository,
) => {
  repositoryListElement.replaceChildren(
    createRepositoryCard(repository),
  );
};

const setApiStatus = (
  statusElement,
  message,
  isError = false,
) => {
  statusElement.textContent = message;
  statusElement.hidden = message === "";

  statusElement.classList.toggle(
    "api-status--error",
    isError,
  );
};

const initGitHubRepository = async () => {
  const statusElement =
    document.querySelector("#github-status");

  const repositoryListElement =
    document.querySelector("#github-repositories");

  if (
    !statusElement ||
    !repositoryListElement
  ) {
    return;
  }

  setApiStatus(
    statusElement,
    "Repository laden...",
  );

  try {
    const repository =
      await fetchRepository();

    renderRepository(
      repositoryListElement,
      repository,
    );

    setApiStatus(
      statusElement,
      "",
    );
  } catch (error) {
    repositoryListElement.replaceChildren();

    setApiStatus(
      statusElement,
      "De repositorygegevens konden niet worden geladen. Probeer het later opnieuw.",
      true,
    );

    console.error(
      "GitHub repository laden mislukt:",
      error,
    );
  }
};

initGitHubRepository();