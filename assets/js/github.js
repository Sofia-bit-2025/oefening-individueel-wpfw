<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Sofia — Software Engineering</title>

    <meta
      name="description"
      content="Portfolio van Sofia, Software Engineering student met focus op backend development, databases, API's en softwarearchitectuur."
    />

    <link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/style.css" />

    <script src="assets/js/github.js" defer></script>
  </head>

  <body>
    <a class="skip-link" href="#main-content">
      Ga naar hoofdinhoud
    </a>

    <header class="site-header">
      <div class="container site-header__inner">
        <a class="site-logo" href="index.html">
          Sofia<span class="site-logo__dot" aria-hidden="true">.</span>
        </a>

        <nav aria-label="Hoofdnavigatie">
          <ul class="nav-list">
            <li>
              <a href="index.html" aria-current="page">
                Home
              </a>
            </li>

            <li>
              <a href="projects.html">
                Projecten
              </a>
            </li>

            <li>
              <a href="blog.html">
                Blog
              </a>
            </li>

            <li>
              <a href="contact.html">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main id="main-content">
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero__inner">
          <div class="hero__content">
            <p class="eyebrow">
              Software Engineering
            </p>

            <img
              class="hero__accent"
              src="assets/images/hero-accent.svg"
              alt=""
              aria-hidden="true"
              width="180"
              height="32"
            />

            <h1 id="hero-title">
              Sofia
            </h1>

            <p class="hero__lead">
              Ik studeer Software Engineering aan De Haagse Hogeschool. Mijn
              interesse ligt bij backend development, databases, API's en
              softwarearchitectuur.
            </p>

            <p class="hero__actions">
              <a
                class="hero__action hero__action--primary"
                href="projects.html"
              >
                Bekijk projecten
              </a>

              <a
                class="hero__action"
                href="contact.html"
              >
                Contact
              </a>
            </p>
          </div>

          <div class="hero__media">
            <img
              class="hero__portrait"
              src="assets/images/profile-placeholder.svg"
              alt=""
              aria-hidden="true"
              width="320"
              height="320"
            />
          </div>
        </div>
      </section>

      <section
        class="section section--muted"
        aria-labelledby="focus-title"
      >
        <div class="container">
          <h2 id="focus-title">
            Technische focus
          </h2>

          <p class="section__intro">
            Ik leer complete applicaties ontwerpen: van API en businesslogica
            tot database en interface.
          </p>

          <ul
            class="tag-list"
            aria-label="Technische vaardigheden"
          >
            <li class="tag">C#</li>
            <li class="tag">.NET</li>
            <li class="tag">ASP.NET Core</li>
            <li class="tag">JavaScript</li>
            <li class="tag">SQL</li>
            <li class="tag">REST API</li>
            <li class="tag">Git</li>
          </ul>
        </div>
      </section>

      <section
        class="section"
        aria-labelledby="projects-title"
      >
        <div class="container">
          <h2 id="projects-title">
            Projecten
          </h2>

          <p class="section__intro">
            Bekijk mijn softwareprojecten en de technieken die ik daarbij
            gebruik.
          </p>

          <p>
            <a href="projects.html">
              Bekijk projecten →
            </a>
          </p>
        </div>
      </section>

      <section
        class="section section--muted"
        aria-labelledby="github-title"
      >
        <div class="container">
          <h2 id="github-title">
            GitHub
          </h2>

          <p class="section__intro">
            Bekijk mijn publieke repositories en recent bijgewerkte
            softwareprojecten op
            <a href="https://github.com/Sofia-bit-2025">
              GitHub
            </a>.
          </p>

          <p
            id="github-status"
            class="api-status"
            aria-live="polite"
          >
            GitHub-gegevens laden...
          </p>

          <ul
            id="github-repositories"
            class="card-grid"
            aria-label="Recente publieke GitHub-repositories"
          ></ul>

          <noscript>
            <p class="note">
              JavaScript is nodig om actuele GitHub-gegevens te tonen. Mijn
              publieke repositories zijn ook rechtstreeks via de GitHub-link
              hierboven beschikbaar.
            </p>
          </noscript>
        </div>
      </section>

      <section
        class="section"
        aria-labelledby="blog-title"
      >
        <div class="container">
          <h2 id="blog-title">
            Blog
          </h2>

          <p class="section__intro">
            Technische notities over software engineering,
            softwareontwikkeling en onderwerpen die ik tijdens mijn studie
            onderzoek.
          </p>

          <p>
            <a href="blog.html">
              Bekijk technische notities →
            </a>
          </p>
        </div>
      </section>

      <section
        class="section section--muted"
        aria-labelledby="ai-title"
      >
        <div class="container">
          <h2 id="ai-title">
            Richting AI Engineering
          </h2>

          <p class="section__intro">
            Op langere termijn wil ik software engineering combineren met data,
            machine learning en AI-integratie.
          </p>

          <ul
            class="tag-list"
            aria-label="Leergebieden richting AI Engineering"
          >
            <li class="tag">Python</li>
            <li class="tag">Machine learning</li>
            <li class="tag">Data engineering</li>
            <li class="tag">AI API's</li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container site-footer__inner">
        <p class="site-footer__text">
          Sofia — Software Engineering
        </p>
      </div>
    </footer>
  </body>
</html>