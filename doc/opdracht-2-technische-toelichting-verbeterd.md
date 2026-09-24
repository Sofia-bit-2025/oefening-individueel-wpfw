# Technische toelichting Opdracht 2

## 1. Scope en technische opbouw

Voor Opdracht 2 heb ik mijn bestaande portfoliosite uitgebreid met JavaScript ES6+.

De oplossing blijft volledig client-side. Voor deze opdracht gebruik ik geen backend, database of JavaScript-framework.

De belangrijkste uitbreidingen zijn:

- projecten vanuit JavaScript-data naar de DOM renderen;
- projecten filteren op gebruikersinvoer;
- technische projectdetails openen en sluiten;
- een contactformulier met client-side validatie;
- toegankelijke fout- en statusfeedback;
- actuele repositorygegevens ophalen via de publieke GitHub REST API.

De JavaScript-code staat in drie externe bestanden:

| Bestand | Verantwoordelijkheid |
|---|---|
| `assets/js/projects.js` | projectdata, filtering, rendering en projectinteracties |
| `assets/js/contact.js` | formuliervalidatie en feedback |
| `assets/js/github.js` | GitHub-data ophalen, controleren en renderen |

De scripts worden vanuit de `<head>` geladen met `defer`.

Daardoor kan de browser de HTML eerst parsen voordat de scripts worden uitgevoerd. De initialisatiefuncties kunnen daarna de benodigde DOM-elementen selecteren en event listeners koppelen.

---

## 2. HTML, CSS en responsive basis

De interactieve onderdelen bouwen voort op semantische HTML.

De pagina's gebruiken onder andere:

- `<header>`;
- `<nav>`;
- `<main>`;
- `<section>`;
- `<article>`;
- `<footer>`;
- `<form>`;
- `<label>`;
- `<ul>` en `<li>`.

Secties zijn gekoppeld aan headings met `aria-labelledby`. De navigatie gebruikt `aria-current="page"` om de actieve pagina aan te geven.

Alle pagina's hebben daarnaast een skip-link naar `#main-content`.

### Responsive CSS

De basislayout is opgebouwd voor kleinere schermen.

Bijvoorbeeld:

```css
.site-header__inner {
  flex-direction: column;
}

.hero__inner {
  flex-direction: column;
}
```

Vanaf `48em` verandert de layout met:

```css
@media (min-width: 48em)
```

Daarbinnen worden onder andere:

- header en navigatie horizontaal geplaatst;
- de hero-inhoud naast de afbeelding gezet;
- de contactgegevens in twee kolommen geplaatst;
- grotere verticale afstanden gebruikt.

De project- en GitHub-kaarten gebruiken daarnaast CSS Grid:

```css
grid-template-columns:
  repeat(
    auto-fit,
    minmax(min(100%, 18rem), 32rem)
  );
```

Hierdoor past het aantal kolommen zich aan de beschikbare breedte aan.

Voor keyboardgebruik gebruikt de stylesheet:

```css
:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}
```

Er is ook ondersteuning voor gebruikers die minder beweging hebben ingesteld:

```css
@media (prefers-reduced-motion: reduce)
```

Daarbij worden onder andere animaties, transitions en smooth scrolling uitgeschakeld.

---

## 3. JavaScript ES6+ en code-organisatie

In mijn JavaScript gebruik ik ES6+-syntax en moderne browser-API's.

| Techniek | Gebruik |
|---|---|
| `const` | standaard voor functies, data en referenties die niet opnieuw worden toegewezen |
| `let` | alleen wanneer een waarde tijdens de uitvoering verandert, bijvoorbeeld `firstInvalidField` |
| arrow functions | functies in de drie JavaScript-bestanden |
| template literals | dynamische teksten, classes, labels en IDs |
| spread syntax | `...project.technologies` bij het samenstellen van zoekbare projectdata |
| `for...of` | itereren over technieken, details, projecten en formuliervelden |
| nullish coalescing `??` | fallback voor een verplichte veldmelding |
| `async` / `await` | verwerken van de GitHub API-request |

De belangrijkste gebruikte DOM-methoden en eigenschappen zijn:

| Methode / eigenschap | Gebruik |
|---|---|
| `querySelector()` | specifieke DOM-elementen selecteren |
| `querySelectorAll()` | alle verplichte formuliervelden selecteren |
| `getElementById()` | gekoppelde foutcontainer vinden |
| `createElement()` | dynamische project- en repository-elementen maken |
| `textContent` | tekst veilig in DOM-elementen plaatsen |
| `append()` / `appendChild()` | nieuwe elementen toevoegen |
| `replaceChildren()` | bestaande dynamische inhoud vervangen |
| `setAttribute()` / `getAttribute()` | onder andere ARIA-state instellen en uitlezen |
| `classList.add()` / `remove()` / `toggle()` | visuele statusclasses aanpassen |
| `hidden` | details en API-status tonen of verbergen |
| `focus()` | focus naar het eerste ongeldige veld verplaatsen |
| `addEventListener()` | gebruikersinteracties afhandelen |

De gebruikte events zijn `input`, `click`, `blur` en `submit`.

---

## 4. Projecten: data, filtering en DOM-rendering

### Wat heb ik gebouwd?

`projects.html` bevat een zoekveld, een statuscontainer en een lege projectenlijst:

- `#project-search`;
- `#projects-status`;
- `#projects-list`.

De projectkaart zelf staat niet hardcoded in de HTML.

De inhoud wordt door `assets/js/projects.js` opgebouwd.

### Projectdata

De databron is:

```js
const projects = [
  {
    id: 1,
    title: "WPFW portfolio",
    // ...
  },
];
```

De huidige array bevat één projectobject.

De functies zijn wel lijst-gebaseerd en verwerken een array met projecten.

Een project bevat:

- `id`;
- `title`;
- `description`;
- `technologies`;
- `status`;
- `repositoryUrl`;
- `details`.

### Data naar interface

| Data | Functie | DOM-weergave |
|---|---|---|
| `id` | `createProjectDetails()` | unieke detail-ID en `aria-controls` |
| `title` | `createProjectCard()` | `<h3>` |
| `description` | `createProjectCard()` | `<p>` |
| `technologies` | `createTechnologyList()` | `<ul>` met `<li>`-tags |
| `status` | `createProjectCard()` | `<p class="status">` |
| `repositoryUrl` | `createProjectCard()` | `<a>` naar GitHub |
| `details` | `createProjectDetails()` | technische detaillijst |

Ik gebruik hiervoor `createElement()` en `textContent` in plaats van complete HTML-fragmenten als strings.

Daardoor blijft duidelijk welk DOM-element wordt aangemaakt en wordt tekst niet als HTML geïnterpreteerd.

### Zoeken en filteren

Voor de opdracht heb ik gekozen voor een filteractie. Sortering is niet toegevoegd, omdat de opdracht een filter- of sorteeractie vraagt.

`normalizeText()` gebruikt:

```js
value.trim().toLocaleLowerCase("nl-NL")
```

Hierdoor hebben hoofdletters en spaties aan het begin of einde geen invloed op de zoekvergelijking.

`projectMatchesSearch()` maakt zoekbare inhoud van:

- `project.title`;
- `project.description`;
- `project.technologies`.

De properties `status`, `repositoryUrl` en `details` worden niet meegenomen in de zoektekst.

`filterProjects(projectList, searchTerm)` gebruikt `.filter()` en retourneert een nieuwe array met passende projecten. De oorspronkelijke `projects`-array wordt hierdoor niet aangepast.

### Eventflow

`initProjectsPage()` koppelt een `input`-event aan `#project-search`.

De flow is:

```text
input-event
→ updateProjects()
→ filterProjects()
→ renderProjects()
→ updateProjectsStatus()
```

`renderProjects()` maakt de lijst eerst leeg met `replaceChildren()` en maakt daarna voor ieder zichtbaar project een nieuwe kaart.

`updateProjectsStatus()` gebruikt zowel de zoekterm als het aantal resultaten om bijvoorbeeld te tonen:

```text
1 project weergegeven.
1 project gevonden.
Geen projecten gevonden voor "xyz123".
```

`#projects-status` heeft `role="status"`, zodat wijzigingen in deze feedback ook door ondersteunende technologie kunnen worden aangekondigd.

### Technische details openen en sluiten

`createProjectDetails()` maakt een `<button>` en een detailcontainer.

De detailcontainer heeft standaard:

```js
details.hidden = true;
```

Bij het `click`-event wordt:

- `aria-expanded` aangepast;
- de `hidden`-property aangepast;
- de knoptekst aangepast.

De tekst wisselt tussen:

```text
Toon technische details
```

en:

```text
Verberg technische details
```

De knop is met `aria-controls` gekoppeld aan de unieke ID van de detailcontainer.

Hierdoor ontstaat een tweede DOM-interactie naast het filteren.

### Toegankelijkheid van dynamische projectdata

`createTechnologyList()` maakt dynamisch een `aria-label`:

```text
Gebruikte technieken voor [projecttitel]
```

Hierdoor krijgt ook een dynamisch aangemaakte techniekenlijst context.

### Initialisatie

`initProjectsPage()` controleert eerst of de drie benodigde DOM-elementen bestaan.

Wanneer één daarvan ontbreekt, stopt de functie met `return`.

Pas daarna wordt de event listener gekoppeld en wordt de eerste rendering uitgevoerd.

---

## 5. Contactformulier en client-side validatie

### Wat heb ik gebouwd?

Het formulier in `contact.html` bevat drie verplichte velden:

| Veld | HTML-regel |
|---|---|
| naam | `required`, `minlength="2"` |
| e-mail | `required`, `type="email"` |
| bericht | `required`, `minlength="10"` |

Het formulier heeft `novalidate`.

Daardoor worden de standaard visuele browsermeldingen niet gebruikt. De HTML-validatie-eigenschappen blijven wel beschikbaar voor mijn JavaScript-logica.

### Validatieflow

Bij submit wordt:

```text
submit-event
→ handleSubmit()
→ preventDefault()
→ validateForm()
→ validateField()
→ getErrorMessage()
```

`getErrorMessage()` leest de waarde met:

```js
field.value.trim()
```

Hierdoor telt invoer met alleen spaties niet als geldige inhoud.

Voor e-mail gebruikt de code de Constraint Validation API:

```js
field.validity.typeMismatch
```

Voor de minimale lengte gebruikt de code:

```js
field.minLength
```

### Foutmelding per veld

Elk verplicht veld heeft een `aria-describedby` dat verwijst naar een eigen foutcontainer.

`getErrorElement()` leest deze ID uit en zoekt de foutcontainer met `document.getElementById()`.

`validateField()`:

1. bepaalt de foutmelding;
2. bepaalt of het veld geldig is;
3. zet `aria-invalid` op `"true"` of `"false"`;
4. schrijft de foutmelding naar de gekoppelde foutcontainer;
5. retourneert `true` of `false`.

### Eerste ongeldige veld

`validateForm(fields)` loopt met `for...of` door alle verplichte velden.

De variabele:

```js
let firstInvalidField = null;
```

wordt alleen aangepast wanneer het eerste ongeldige veld wordt gevonden.

`handleSubmit()` gebruikt dit resultaat om bij ongeldige invoer:

- de algemene foutstatus te tonen;
- de focus naar het eerste ongeldige veld te verplaatsen;
- verdere verwerking te stoppen.

### `blur`, `input` en `submit`

De velden gebruiken twee events.

Bij `blur` wordt het veld direct gevalideerd.

Bij `input` voert `handleFieldInput()` eerst uit:

```js
setFormStatus(statusElement, "");
```

Hiermee wordt een eerdere algemene statusmelding verwijderd.

Daarna wordt alleen opnieuw gevalideerd wanneer het veld eerder:

```text
aria-invalid="true"
```

had.

Hierdoor wordt een gebruiker tijdens de eerste invoer niet bij iedere toetsaanslag direct met fouten geconfronteerd, maar kan een bestaande fout wel direct verdwijnen wanneer de invoer wordt gecorrigeerd.

Bij `submit` worden alle verplichte velden gecontroleerd.

### Geldige invoer

Wanneer alle velden geldig zijn, verschijnt:

```text
Je invoer is geldig. De gegevens zijn niet verzonden.
```

Het formulier wordt in deze opdracht niet naar een server gestuurd.

`event.preventDefault()` wordt altijd uitgevoerd en de implementatie bevat geen backend-request of opslag voor de ingevoerde naam, e-mail of het bericht.

### Samenwerking tussen JavaScript en CSS

JavaScript bepaalt de foutstatus met:

```text
aria-invalid="true"
```

CSS gebruikt vervolgens:

```css
.form__input[aria-invalid="true"]
```

om de border van het veld als foutstatus weer te geven.

De algemene formulierstatus krijgt via JavaScript de classes:

```text
form__status--success
```

of:

```text
form__status--error
```

CSS bepaalt daarna de visuele weergave.

---

## 6. GitHub REST API

### Wat heb ik gebouwd?

Op `index.html` staat een GitHub-sectie met:

- `#github-status`;
- `#github-repositories`.

`assets/js/github.js` haalt actuele informatie op over mijn WPFW-repository.

Het gebruikte endpoint is:

```text
https://api.github.com/repos/Sofia-bit-2025/wpfw-portfolio-sofia
```

Voor deze request staat geen API-key of token in mijn frontendcode.

### HTTP-request en `async/await`

`fetchRepository()` is een `async` functie.

De functie voert uit:

```js
const response = await fetch(GITHUB_API_URL);
```

`fetch()` retourneert een Promise. Met `await` wacht de functie op de HTTP-response.

Daarna controleert de code:

```js
if (!response.ok)
```

Wanneer de HTTP-response niet als succesvol wordt gezien, wordt een `Error` gegooid met de HTTP-status:

```js
throw new Error(`HTTP ${response.status}`);
```

Bij een geldige response wordt de body met:

```js
await response.json()
```

omgezet van JSON naar een JavaScript-object.

### Controle van de API-response

Na het parsen controleert `isValidRepository()` de minimale structuur van de data.

De functie controleert of:

- een repositorywaarde aanwezig is;
- de waarde een object is;
- `name` een string is;
- `html_url` een string is;
- `updated_at` een string is.

Als deze minimale structuur niet klopt, wordt:

```text
Onverwachte GitHub API-response.
```

als `Error` gegooid.

Dit is een minimale structuurcontrole. De functie valideert bijvoorbeeld niet afzonderlijk het datatype van `description` en `language` en controleert niet of `html_url` een geldige URL is.

### API-data naar interface

| API-property | Verwerking | Interface |
|---|---|---|
| `name` | `createRepositoryCard()` | repositorynaam / linktekst |
| `html_url` | `createRepositoryCard()` | `href` van de link |
| `description` | fallback wanneer de waarde leeg/falsy is | beschrijving |
| `language` | alleen toegevoegd wanneer een waarde aanwezig is | techniek-tag |
| `updated_at` | `formatDate()` | bijgewerkte datum |

Als `description` geen bruikbare waarde bevat, wordt getoond:

```text
Geen beschrijving beschikbaar.
```

Als `language` geen waarde bevat, wordt hiervoor geen `<li>` aangemaakt.

### Datumverwerking

`formatDate()` maakt eerst:

```js
const date = new Date(dateString);
```

Daarna controleert de functie:

```js
Number.isNaN(date.getTime())
```

Als de datum niet verwerkt kan worden, retourneert de functie:

```text
Datum onbekend
```

Bij een geldige datum wordt `Intl.DateTimeFormat("nl-NL")` gebruikt voor een Nederlandse datumweergave.

### Dynamische rendering

`createRepositoryCard()` maakt de repositorykaart met DOM-methoden zoals:

- `createElement()`;
- `textContent`;
- `appendChild()`;
- `append()`.

`renderRepository()` gebruikt:

```js
replaceChildren()
```

om de actuele kaart in `#github-repositories` te plaatsen.

De dynamisch gemaakte informatielijst krijgt een `aria-label` in de vorm:

```text
Repositoryinformatie voor [repositorynaam]
```

### Loading- en foutstatus

`initGitHubRepository()` zet eerst de status op:

```text
Repository laden...
```

Daarna wordt `fetchRepository()` uitgevoerd.

Bij succes:

1. wordt de repositorykaart gerenderd;
2. wordt de status leeg gemaakt;
3. verbergt `setApiStatus()` het statuselement via `hidden`.

Bij een fout komt de uitvoering in `catch`.

Daar wordt:

- bestaande repository-inhoud verwijderd;
- een gebruikersgerichte foutmelding getoond;
- de class `api-status--error` toegevoegd;
- de technische fout met `console.error()` gelogd.

De zichtbare melding is:

```text
De repositorygegevens konden niet worden geladen. Probeer het later opnieuw.
```

De CSS-class `.api-status--error` past de border-, achtergrond- en tekstkleur van deze foutstatus aan.

Een netwerkfout, een HTTP-fout of de bewust gegooide fout bij een onverwachte API-structuur komt via deze `catch` in dezelfde gebruikersgerichte foutafhandeling terecht.

### Consolecontrole

Tijdens normaal gebruik hoort de functionaliteit geen onverwachte consolefouten te veroorzaken.

Bij een bewust gesimuleerd GitHub-foutscenario is wel een `console.error()` verwacht, omdat de `catch` de technische fout bewust naar de console schrijft.

Dit onderscheid moet bij het testen worden meegenomen.

---

## 7. Onderhoudbaarheid en functieverdeling

De JavaScript-logica is opgesplitst in benoembare functies met een beperkte verantwoordelijkheid.

Voorbeelden:

| Functie | Verantwoordelijkheid |
|---|---|
| `normalizeText()` | tekst normaliseren voor zoeken |
| `filterProjects()` | projecten filteren |
| `createProjectCard()` | één projectkaart opbouwen |
| `renderProjects()` | een projectlijst in de DOM renderen |
| `getErrorMessage()` | foutmelding voor één veld bepalen |
| `validateField()` | één veld valideren en feedback aanpassen |
| `validateForm()` | alle verplichte velden controleren |
| `fetchRepository()` | GitHub-data ophalen en controleren |
| `createRepositoryCard()` | repositorydata naar DOM omzetten |
| `setApiStatus()` | API-status tonen, verbergen of als fout markeren |

Waar mogelijk ontvangen functies hun benodigde data of DOM-elementen via parameters.

Voorbeelden zijn:

```text
filterProjects(projectList, searchTerm)
renderProjects(projectList, projectsListElement)
validateForm(fields)
setFormStatus(statusElement, message, type)
```

Hierdoor hoeft niet iedere functie zelf globale DOM-elementen of globale data op te zoeken.

Ik claim hiermee geen geautomatiseerde unit-tests. De structuur maakt de verantwoordelijkheden wel duidelijker en onderdelen zijn eenvoudiger afzonderlijk aan te roepen en te controleren.

De functies:

- `initProjectsPage()`;
- `initContactForm()`;
- `initGitHubRepository()`

vormen de koppeling tussen de pagina en de overige logica.

Alle drie controleren eerst of de benodigde DOM-elementen bestaan voordat verdere logica wordt uitgevoerd.

---

## 8. Toegankelijkheid

Toegankelijkheid zit zowel in de statische HTML als in de dynamisch aangemaakte DOM.

De belangrijkste onderdelen zijn:

| Techniek | Gebruik |
|---|---|
| skip-link | direct naar `#main-content` navigeren |
| `aria-current="page"` | huidige navigatiepagina aangeven |
| `aria-labelledby` | secties aan hun heading koppelen |
| `<label for="...">` | formuliervelden voorzien van labels |
| `aria-describedby` | veld koppelen aan de eigen foutmelding |
| `aria-invalid` | validatiestatus van een veld aangeven |
| `role="status"` | dynamische statusfeedback laten aankondigen |
| `aria-expanded` | open/dicht-status van projectdetails aangeven |
| `aria-controls` | knop of zoekveld koppelen aan bijbehorende inhoud |
| dynamische `aria-label`s | context geven aan gegenereerde lijsten |
| `focus()` | focus naar eerste ongeldige veld verplaatsen |
| `:focus-visible` | keyboardfocus zichtbaar maken |
| `<noscript>` | uitleg geven als JavaScript is uitgeschakeld |
| `prefers-reduced-motion` | beweging beperken wanneer de gebruiker dit heeft ingesteld |

Feedback is daardoor niet alleen afhankelijk van een visuele kleurwijziging.

---

## 9. Relatie met de criteria van Opdracht 2

| Criterium | Implementatie | Extra technisch bewijs |
|---|---|---|
| Interactief gedrag met DOM | projectfilter + details openen/sluiten | `input`- en `click`-events, dynamische rendering, `hidden`, `aria-expanded` |
| Formuliervalidatie | naam, e-mail en bericht | `trim()`, `typeMismatch`, `minLength`, `preventDefault()` |
| Toegankelijke feedback | veldfouten en algemene statuses | `aria-describedby`, `aria-invalid`, `role="status"`, focusmanagement |
| Afstemming interface en gegevens | `projects[]` naar projectkaarten | data-properties worden via specifieke renderfuncties naar DOM-elementen vertaald |
| Externe data via Fetch API | publieke GitHub REST API | `fetch()`, `async/await`, `response.ok`, JSON, structuurcontrole, loading/error |
| Testbare/herbruikbare codestructuur | kleine benoembare functies | functies met beperkte verantwoordelijkheid en parameters voor benodigde dependencies |

De huidige `projects[]` bevat één project. De code ondersteunt een lijst met meerdere projectobjecten, maar ik documenteer alleen de data die daadwerkelijk aanwezig is.

---

## 10. Testen en technische controle

Deze technische toelichting beschrijft de implementatie. Of alle functionaliteit in de browser correct werkt, moet apart door uitvoering worden gecontroleerd.

Belangrijke controles voor deze implementatie zijn:

- initiële projectrendering;
- zoeken met een bestaande zoekterm;
- zoeken zonder resultaat;
- projectdetails openen en sluiten;
- leeg formulier;
- ongeldige e-mail;
- te korte naam en berichttekst;
- geldige formulierinvoer;
- focus op het eerste ongeldige veld;
- GitHub loading-state;
- succesvolle API-response;
- gesimuleerde API-fout;
- keyboardbediening;
- responsive layout;
- onverwachte consolefouten tijdens normaal gebruik.

Bij een bewust gesimuleerd API-foutscenario is de door `console.error()` geschreven GitHub-fout verwacht en moet deze niet worden verward met een onverwachte JavaScript-fout.

Ik neem testresultaten alleen als geslaagd bewijs op nadat deze daadwerkelijk in de browser zijn uitgevoerd.

---

## 11. Grenzen van de huidige implementatie

De oplossing blijft bewust binnen de scope van Opdracht 2.

Daarom:

- bevat de website geen backend of database;
- wordt het contactformulier niet naar een server verzonden;
- worden de ingevoerde formuliergegevens door deze implementatie niet opgeslagen;
- bevat `projects[]` momenteel één project;
- doet `isValidRepository()` alleen een minimale structuurcontrole;
- bevat de API-code geen API-key of token;
- claimt deze toelichting geen geautomatiseerde unit-tests.

Deze beperkingen worden niet verborgen met documentatie; ze beschrijven de huidige implementatie zoals deze in de broncode staat.

---

## 12. AI-gebruik

ChatGPT is gebruikt voor:

- kritische vergelijking van de technische toelichting met de broncode;
- controle op inconsistenties en ontbrekende technische uitleg;
- herstructureren en herschrijven van de technische toelichting.

De technische claims in dit document zijn gecontroleerd tegen de actuele HTML-, CSS- en JavaScript-code.

Ik gebruik alleen uitleg die ik aan de hand van mijn eigen broncode kan terugvinden en technisch kan toelichten.