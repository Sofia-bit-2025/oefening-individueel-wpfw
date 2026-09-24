# Opdracht 2 – Testresultaten

## 1. Doel en testaanpak

Voor Opdracht 2 test ik de interactieve onderdelen van mijn portfolio handmatig in de browser.

De tests zijn gebaseerd op mijn definitieve HTML-, CSS- en JavaScript-code. Ik gebruik geen geautomatiseerde unit-, integratie- of end-to-endtests.

De belangrijkste onderdelen die ik controleer zijn:

- projecten dynamisch renderen vanuit `projects[]`;
- zoeken en filteren via gebruikersinvoer;
- technische projectdetails openen en sluiten;
- minimaal twee DOM-interacties;
- validatie van naam, e-mail en bericht;
- veldspecifieke en toegankelijke foutfeedback;
- herstel van foutstatus tijdens nieuwe invoer;
- GitHub-data ophalen via `fetch()`;
- verwerking van de JSON-response;
- loading-, success- en errorstates;
- HTTP-, data- en netwerkfouten;
- keyboardbediening en focus;
- responsive gedrag;
- onverwachte JavaScript-errors in de browserconsole.

### Teststatussen

Per test gebruik ik één van deze statussen:

- **Geslaagd**
- **Niet geslaagd**
- **Gedeeltelijk geslaagd**
- **Nog niet getest**

Een test krijgt pas **Geslaagd** nadat ik de stappen daadwerkelijk in de browser heb uitgevoerd en het werkelijke resultaat overeenkomt met het verwachte resultaat.

Wanneer een fout wordt gevonden, leg ik vast:

1. wat er fout ging;
2. welke code is aangepast;
3. welke stappen opnieuw zijn uitgevoerd;
4. wat de uitkomst van de hertest was.

---

## 2. Testomgeving

Deze gegevens worden na het uitvoeren van de tests definitief ingevuld.

- Datum: `[invullen]`
- Besturingssysteem: `[invullen]`
- Browser + versie: `[invullen]`
- Website geopend via Live Server: `[ja / nee]`
- Geplande hulpmiddelen:
  - Developer Tools
  - Elements
  - Console
  - Network
  - responsive/device mode
- Geplande schermbreedtes:
  - `375px`
  - `768px`
  - `1440px`

---

# 3. Projecten en DOM-interactie

## Test P1 – Project dynamisch renderen

**Soort test:** functionele browsertest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of de projectinformatie vanuit de JavaScript-array naar de DOM wordt gerenderd.

### Voorwaarde

- `projects.html` is geopend.
- JavaScript is ingeschakeld.
- `assets/js/projects.js` is geladen.

### Teststappen

1. Open `projects.html`.
2. Laat `#project-search` leeg.
3. Controleer `#projects-list`.
4. Controleer `#projects-status`.

### Verwacht resultaat

- Het project `WPFW portfolio` wordt zichtbaar.
- De kaart toont minimaal:
  - status;
  - titel;
  - beschrijving;
  - technieken;
  - knop voor technische details;
  - GitHub-link.
- `#projects-status` toont:

```text
1 project weergegeven.
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `projects.html`
- `assets/js/projects.js`
- `projects[]`
- `createProjectCard()`
- `renderProjects()`
- `updateProjects()`
- `#projects-list`
- `#projects-status`

**Rubric:** afstemming interface en gegevens.

---

## Test P2 – Zoeken op bestaande techniek

**Soort test:** DOM-interactietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of het `input`-event de projectenlijst filtert.

### Voorwaarde

Het project is zichtbaar op `projects.html`.

### Teststappen

1. Klik in `#project-search`.
2. Typ:

```text
JavaScript
```

3. Controleer de projectkaart.
4. Controleer de statusmelding.

### Verwacht resultaat

- Het project blijft zichtbaar.
- `JavaScript` wordt gevonden in `project.technologies`.
- De status wordt:

```text
1 project gevonden.
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `input`-event
- `projectMatchesSearch()`
- `filterProjects()`
- `updateProjects()`
- `updateProjectsStatus()`

**Rubric:** interactief gedrag met de DOM.

---

## Test P3 – Zoekterm met hoofdletters en spaties

**Soort test:** randgeval  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of de zoeknormalisatie werkt.

### Voorwaarde

`projects.html` is geopend.

### Teststappen

Typ letterlijk:

```text
  JAVASCRIPT  
```

### Verwacht resultaat

- Het project blijft zichtbaar.
- De status toont:

```text
1 project gevonden.
```

De zoekterm moet overeenkomen omdat `normalizeText()` `trim()` en `toLocaleLowerCase("nl-NL")` gebruikt.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `normalizeText()`
- `projectMatchesSearch()`

---

## Test P4 – Geen zoekresultaat

**Soort test:** negatieve DOM-test  
**Bewijsniveau:** kernbewijs

### Doel

Controleren hoe de interface reageert wanneer geen project overeenkomt.

### Teststappen

Typ:

```text
xyz123
```

### Verwacht resultaat

- `#projects-list` bevat geen projectkaart meer.
- De status toont exact:

```text
Geen projecten gevonden voor "xyz123".
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `filterProjects()`
- `renderProjects()`
- `replaceChildren()`
- `updateProjectsStatus()`

---

## Test P5 – Zoekterm wissen

**Soort test:** hersteltest  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of de oorspronkelijke projectweergave terugkomt nadat de zoekterm wordt verwijderd.

### Voorwaarde

Test P4 is uitgevoerd en er is geen project zichtbaar.

### Teststappen

1. Selecteer `xyz123`.
2. Verwijder de volledige zoekterm.
3. Laat het zoekveld leeg.

### Verwacht resultaat

- Het project verschijnt opnieuw.
- De status wordt:

```text
1 project weergegeven.
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

`projectMatchesSearch()` retourneert `true` wanneer de genormaliseerde zoekterm leeg is.

---

## Test P6 – Technische details openen

**Soort test:** DOM-interactietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren van de tweede JavaScript-interactie.

### Voorwaarde

De projectkaart is zichtbaar.

### Teststappen

1. Inspecteer de detailknop.
2. Controleer dat `aria-expanded="false"` is.
3. Klik op:

```text
Toon technische details
```

4. Controleer de detailcontainer.
5. Controleer opnieuw `aria-expanded`.

### Verwacht resultaat

- De technische details worden zichtbaar.
- `aria-expanded` verandert naar `"true"`.
- De knoptekst wordt:

```text
Verberg technische details
```

- `aria-controls` verwijst naar de ID van de detailcontainer.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `createProjectDetails()`
- `click`-event
- `details.hidden`
- `aria-expanded`
- `aria-controls`

**Rubric:** tweede relevante DOM-interactie.

---

## Test P7 – Technische details sluiten

**Soort test:** DOM-interactietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of de detailinteractie ook correct kan worden teruggedraaid.

### Voorwaarde

De technische details staan open.

### Teststappen

Klik op:

```text
Verberg technische details
```

### Verwacht resultaat

- De detailcontainer wordt verborgen.
- `aria-expanded` wordt `"false"`.
- De knoptekst wordt:

```text
Toon technische details
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `createProjectDetails()`
- dezelfde `click`-eventlistener als bij P6.

---

## Test P8 – Meerdere projectinteracties achter elkaar

**Soort test:** gecombineerde functionele test  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of de verschillende projectinteracties elkaar niet verstoren.

### Teststappen

1. Zoek op `JavaScript`.
2. Controleer dat het project zichtbaar blijft.
3. Open de technische details.
4. Sluit de technische details.
5. Wis de zoekterm.
6. Controleer de console.

### Verwacht resultaat

- Filtering blijft correct werken.
- Details kunnen na filtering worden geopend en gesloten.
- Na het wissen van de zoekterm blijft het project zichtbaar.
- De status is uiteindelijk:

```text
1 project weergegeven.
```

- Er verschijnen geen onverwachte JavaScript-errors.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `input`-event
- `click`-event
- `updateProjects()`
- `createProjectDetails()`

---

## Beperking van de projecttests

De huidige `projects[]` bevat één projectobject.

Daarom kan ik met de huidige definitieve dataset niet eerlijk aantonen:

- meerdere gelijktijdige zoekresultaten;
- rendering van meerdere projectkaarten;
- statusmeldingen zoals `2 projecten gevonden.`.

De code bevat meervoudslogica, maar dit testdocument claimt geen resultaat dat niet met de huidige data uitvoerbaar is.

---

# 4. Contactformulier en validatie

## Test F1 – Alle verplichte velden leeg

**Soort test:** negatieve validatietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of alle drie verplichte velden worden gevalideerd en de eerste fout focus krijgt.

### Voorwaarde

`contact.html` is geopend en alle velden zijn leeg.

### Teststappen

Klik direct op:

```text
Controleer invoer
```

### Verwacht resultaat

De foutmeldingen zijn:

```text
Vul je naam in.
Vul je e-mailadres in.
Schrijf een bericht.
```

Daarnaast:

- alle drie velden krijgen `aria-invalid="true"`;
- `#form-status` toont:

```text
Controleer de gemarkeerde velden.
```

- de focus staat op `#contact-name`;
- er verschijnt geen succesmelding;
- de normale formulierverzending vindt niet plaats.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `handleSubmit()`
- `validateForm()`
- `validateField()`
- `getErrorMessage()`
- `REQUIRED_MESSAGES`
- `firstInvalidField.focus()`
- `event.preventDefault()`

**Rubric:** formuliervalidatie en toegankelijke feedback.

---

## Test F2 – Alleen naam leeg

**Soort test:** negatieve validatietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of een leeg naamveld onafhankelijk wordt herkend.

### Voorwaarde

Vul in:

- e-mail: `sofia@example.com`
- bericht: `Dit is een geldig testbericht.`
- naam: leeg

### Teststappen

Klik op `Controleer invoer`.

### Verwacht resultaat

- Bij naam verschijnt:

```text
Vul je naam in.
```

- Naam krijgt `aria-invalid="true"`.
- E-mail en bericht zijn geldig.
- Focus gaat naar het naamveld.
- Geen successtatus verschijnt.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `REQUIRED_MESSAGES.name`
- `getErrorMessage()`
- `validateForm()`

---

## Test F3 – Alleen e-mail leeg

**Soort test:** negatieve validatietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of een leeg e-mailveld onafhankelijk wordt herkend.

### Voorwaarde

Vul in:

- naam: `Sofia`
- e-mail: leeg
- bericht: `Dit is een geldig testbericht.`

### Teststappen

Klik op `Controleer invoer`.

### Verwacht resultaat

Bij e-mail verschijnt:

```text
Vul je e-mailadres in.
```

Daarnaast:

- e-mail krijgt `aria-invalid="true"`;
- focus gaat naar het e-mailveld;
- er verschijnt geen successtatus.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `REQUIRED_MESSAGES.email`
- `validateField()`
- `firstInvalidField`

---

## Test F4 – Alleen bericht leeg

**Soort test:** negatieve validatietest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of een leeg bericht onafhankelijk wordt herkend.

### Voorwaarde

Vul in:

- naam: `Sofia`
- e-mail: `sofia@example.com`
- bericht: leeg

### Teststappen

Klik op `Controleer invoer`.

### Verwacht resultaat

Bij het bericht verschijnt:

```text
Schrijf een bericht.
```

Daarnaast:

- bericht krijgt `aria-invalid="true"`;
- focus gaat naar het berichtveld;
- er verschijnt geen successtatus.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `REQUIRED_MESSAGES.message`
- `validateForm()`

---

## Test F5 – Naam onder minimale lengte

**Soort test:** boundary-/validatietest  
**Bewijsniveau:** extra technisch bewijs

### Voorwaarde

Vul in:

- naam: `A`
- e-mail: `sofia@example.com`
- bericht: `Dit is een geldig testbericht.`

### Teststappen

Klik op `Controleer invoer`.

### Verwacht resultaat

Bij naam verschijnt:

```text
Gebruik minimaal 2 tekens.
```

Naam krijgt:

```text
aria-invalid="true"
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `minlength="2"`
- `field.minLength`
- `value.length < field.minLength`

---

## Test F6 – Ongeldig e-mailadres

**Soort test:** negatieve validatietest  
**Bewijsniveau:** kernbewijs

### Voorwaarde

Vul in:

- naam: `Sofia`
- e-mail: `test@`
- bericht: `Dit is een geldig testbericht.`

### Teststappen

1. Vul de waarden in.
2. Klik direct op `Controleer invoer`.
3. Controleer de fout bij het e-mailveld.

### Verwacht resultaat

De e-mailmelding wordt:

```text
Vul een geldig e-mailadres in.
```

Daarnaast:

- e-mail krijgt `aria-invalid="true"`;
- er verschijnt geen succesmelding.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

`getErrorMessage()` gebruikt:

```js
field.validity.typeMismatch
```

Dit gebruikt de Constraint Validation API. Door `novalidate` wordt de eigen feedback van `contact.js` gebruikt in plaats van de standaard visuele browsermelding.

---

## Test F7 – Bericht onder minimale lengte

**Soort test:** boundary-/validatietest  
**Bewijsniveau:** kernbewijs

### Voorwaarde

Vul in:

- naam: `Sofia`
- e-mail: `sofia@example.com`
- bericht: `kort`

### Teststappen

Klik op `Controleer invoer`.

### Verwacht resultaat

Bij het bericht verschijnt:

```text
Gebruik minimaal 10 tekens.
```

Het berichtveld krijgt `aria-invalid="true"`.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `minlength="10"`
- `field.minLength`
- `getErrorMessage()`

---

## Test F8 – Naam bevat alleen spaties

**Soort test:** randgeval  
**Bewijsniveau:** extra technisch bewijs

### Voorwaarde

Vul een geldige e-mail en geldig bericht in.

### Teststappen

1. Vul bij naam meerdere spaties in.
2. Klik op `Controleer invoer`.

### Verwacht resultaat

De waarde wordt door `trim()` als leeg behandeld.

De melding wordt:

```text
Vul je naam in.
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

```js
const value = field.value.trim();
```

---

## Test F9 – Validatie bij `blur`

**Soort test:** event-/validatietest  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of een veld al wordt gevalideerd wanneer de gebruiker het verlaat, zonder eerst het formulier te verzenden.

### Teststappen

1. Vul bij naam:

```text
A
```

2. Druk op `Tab` zodat de focus naar het e-mailveld gaat.
3. Controleer de naamfout.

### Verwacht resultaat

Zonder submit verschijnt bij naam:

```text
Gebruik minimaal 2 tekens.
```

Het naamveld krijgt:

```text
aria-invalid="true"
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `blur`-event
- `handleFieldBlur()`
- `validateField()`

---

## Test F10 – Foutstatus herstellen tijdens invoer

**Soort test:** herstel-/eventtest  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of een bestaande fout tijdens nieuwe invoer wordt hersteld.

### Voorwaarde

Er moet eerst daadwerkelijk een algemene foutstatus bestaan.

### Teststappen

1. Laat alle velden leeg.
2. Klik op `Controleer invoer`.
3. Controleer dat de algemene melding zichtbaar is:

```text
Controleer de gemarkeerde velden.
```

4. Typ daarna `Sofia` in het naamveld zonder opnieuw te submitten.
5. Controleer de naamfout, `aria-invalid` en algemene status.

### Verwacht resultaat

Tijdens het `input`-event:

- wordt de algemene formulierstatus gewist;
- wordt het naamveld opnieuw gevalideerd omdat het eerder ongeldig was;
- verdwijnt de foutmelding bij naam;
- verandert `aria-invalid` van `"true"` naar `"false"`.

De foutmeldingen van e-mail en bericht blijven bestaan totdat die velden zelf worden aangepast of opnieuw worden gevalideerd.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `handleFieldInput()`
- `setFormStatus(statusElement, "")`
- `validateField()`

---

## Test F11 – Focus op eerste daadwerkelijke fout

**Soort test:** toegankelijkheids-/validatietest  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of `firstInvalidField` niet altijd het naamveld kiest, maar werkelijk het eerste ongeldige veld.

### Voorwaarde

Vul in:

- naam: `Sofia`
- e-mail: `test@`
- bericht: `Dit is een geldig testbericht.`

### Teststappen

Klik op `Controleer invoer`.

### Verwacht resultaat

- Naam is geldig.
- E-mail is ongeldig.
- De focus gaat naar `#contact-email`.
- De e-mailfout wordt getoond.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `validateForm()`
- `firstInvalidField`
- `firstInvalidField.focus()`

---

## Test F12 – Volledig geldige invoer

**Soort test:** happy-flow validatietest  
**Bewijsniveau:** kernbewijs

### Voorwaarde

Open ook de Network-tab en wis bestaande requests voordat op de formulierknop wordt geklikt.

Vul in:

- naam: `Sofia`
- e-mail: `sofia@example.com`
- bericht: `Dit is een geldig testbericht.`

### Teststappen

1. Vul de drie waarden in.
2. Wis indien nodig de bestaande Network-log.
3. Klik op `Controleer invoer`.
4. Controleer veldfouten.
5. Controleer `aria-invalid`.
6. Controleer `#form-status`.
7. Controleer of het klikken geen nieuw formulier-/backendrequest veroorzaakt.

### Verwacht resultaat

- Er staan geen veldfouten.
- Alle drie velden hebben `aria-invalid="false"`.
- De algemene status toont:

```text
Je invoer is geldig. De gegevens zijn niet verzonden.
```

- Het formulier veroorzaakt geen backendrequest.
- De pagina wordt niet herladen.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `validateForm()`
- `handleSubmit()`
- `event.preventDefault()`
- `setFormStatus(..., "success")`

**Rubric:** geldige invoer moet duidelijke bevestiging geven.

---

# 5. Toegankelijke feedback

## Test T1 – `aria-describedby` en `aria-invalid`

**Soort test:** toegankelijkheidsinspectie  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of veldfouten technisch aan het juiste formulierveld zijn gekoppeld.

### Teststappen

1. Open `contact.html`.
2. Inspecteer `#contact-name`.
3. Controleer:

```text
aria-describedby="contact-name-error"
```

4. Controleer dat `#contact-name-error` bestaat.
5. Herhaal dit voor:
   - `#contact-email`;
   - `#contact-message`.
6. Maak daarna één veld ongeldig.
7. Controleer `aria-invalid`.
8. Herstel het veld en controleer opnieuw.

### Verwacht resultaat

Voor ieder veld:

- verwijst `aria-describedby` naar de juiste foutcontainer;
- wordt fouttekst in die container geplaatst;
- verandert `aria-invalid` naar `"true"` bij een fout;
- verandert `aria-invalid` terug naar `"false"` wanneer het veld geldig is.

De fout wordt daarnaast als tekst getoond en is dus niet alleen via kleur herkenbaar.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `contact.html`
- `getErrorElement()`
- `validateField()`
- `.form__error`
- `.form__input[aria-invalid="true"]`

**Rubric:** toegankelijke gebruikersfeedback.

---

## Test T2 – Dynamische `role="status"`-elementen

**Soort test:** toegankelijkheids-/DOM-test  
**Bewijsniveau:** sterk aanvullend bewijs

### Doel

Controleren of dynamische gebruikersfeedback in elementen met `role="status"` terechtkomt.

### Teststappen

Controleer achtereenvolgens:

1. `#projects-status` op `projects.html`.
2. `#form-status` op `contact.html`.
3. `#github-status` op `index.html`.
4. Controleer in Elements dat ieder relevant element `role="status"` heeft.
5. Activeer een statuswijziging:
   - zoek naar `xyz123`;
   - submit een leeg formulier;
   - laad GitHub-data.

### Verwacht resultaat

- De elementen behouden `role="status"`.
- De zichtbare tekst verandert volgens de betreffende interactie.

Deze test controleert de DOM-implementatie van de statusregio. Hij bewijst zonder screenreader niet zelfstandig dat iedere screenreader de melding daadwerkelijk aankondigt.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `#projects-status`
- `#form-status`
- `#github-status`
- `role="status"`

---

## Test T3 – Keyboardbediening

**Soort test:** handmatige toegankelijkheidstest  
**Bewijsniveau:** extra technisch bewijs

### Teststappen

Gebruik alleen:

- `Tab`;
- `Shift+Tab`;
- `Enter`;
- `Space`;
- normale tekstinvoer.

Controleer minimaal:

1. hoofdnavigatie;
2. projectzoekveld;
3. detailknop;
4. contactvelden;
5. knop `Controleer invoer`.

Gebruik:

- `Enter` voor links;
- `Enter` of `Space` voor buttons.

### Verwacht resultaat

- Interactieve onderdelen zijn via keyboard bereikbaar.
- De focusvolgorde is logisch.
- Het gefocuste onderdeel heeft een zichtbare focusindicator.
- De detailknop kan met keyboard worden geopend en gesloten.
- Het formulier kan zonder muis worden bediend.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

```css
:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}
```

---

## Test T4 – Skip-link

**Soort test:** keyboardtoegankelijkheidstest  
**Bewijsniveau:** extra technisch bewijs

### Teststappen

1. Open een pagina opnieuw.
2. Druk één keer op `Tab`.
3. Controleer of `Ga naar hoofdinhoud` zichtbaar wordt.
4. Druk op `Enter`.

### Verwacht resultaat

- De skip-link wordt zichtbaar bij focus.
- Activering navigeert naar:

```text
#main-content
```

- De gebruiker kan de herhaalde header/navigatie overslaan.

De huidige `<main id="main-content">` heeft geen `tabindex="-1"`. Daarom claimt deze test niet dat `<main>` in iedere browser gegarandeerd programmatische focus ontvangt.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `.skip-link`
- `.skip-link:focus`
- `href="#main-content"`
- `<main id="main-content">`

---

## Test T5 – `prefers-reduced-motion`

**Soort test:** aanvullende toegankelijkheidstest  
**Bewijsniveau:** extra kwaliteit

### Voorwaarde

De gebruikte browser/DevTools moet `prefers-reduced-motion` kunnen emuleren.

### Teststappen

1. Emuleer:

```text
prefers-reduced-motion: reduce
```

2. Herlaad of inspecteer de pagina.
3. Controleer smooth scrolling en eventuele transitions/animations.

### Verwacht resultaat

Binnen de media query worden:

- smooth scrolling uitgeschakeld;
- transitions uitgeschakeld;
- animations uitgeschakeld.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

```css
@media (prefers-reduced-motion: reduce)
```

---

# 6. GitHub REST API

## Test A1 – Loading state

**Soort test:** API-/feedbacktest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of de gebruiker tijdens het ophalen ziet dat data wordt geladen.

### Voorwaarde

Gebruik voor deze test een browser of ontwikkeltool waarmee de netwerkverbinding kan worden vertraagd.

### Teststappen

1. Open `index.html`.
2. Open DevTools → Network.
3. Activeer een trage netwerkconfiguratie.
4. Herlaad de pagina.
5. Bekijk `#github-status` voordat de response is voltooid.

### Verwacht resultaat

Tijdens het wachten is zichtbaar:

```text
Repository laden...
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `#github-status`
- `setApiStatus()`
- `initGitHubRepository()`

**Rubric:** zichtbare loading state.

---

## Test A2 – Succesvolle API-response en JSON-mapping

**Soort test:** API-/dataverwerkingstest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of de JSON-data uit de publieke GitHub API correct wordt verwerkt en naar de interface wordt vertaald.

### Voorwaarde

- internetverbinding werkt;
- originele `GITHUB_API_URL` is ingesteld;
- repository is publiek bereikbaar.

### Teststappen

1. Open DevTools → Network.
2. Herlaad `index.html`.
3. Open het request naar:

```text
https://api.github.com/repos/Sofia-bit-2025/wpfw-portfolio-sofia
```

4. Bekijk de JSON-response.
5. Controleer minimaal:
   - `name`;
   - `html_url`;
   - `description`;
   - `language`;
   - `updated_at`.
6. Vergelijk deze waarden met de zichtbare repositorykaart.
7. Controleer daarna `#github-status`.

### Verwacht resultaat

- `name` wordt de zichtbare repositorynaam/linktekst.
- `html_url` wordt de bestemming van de link.
- `description` wordt weergegeven.

Wanneer `description` geen bruikbare waarde bevat, toont de code:

```text
Geen beschrijving beschikbaar.
```

- `language` wordt alleen als tag toegevoegd wanneer GitHub een waarde levert.
- `updated_at` wordt via `formatDate()` als Nederlandse datum weergegeven.
- Na succes wordt `#github-status` verborgen.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `fetchRepository()`
- `response.json()`
- `createRepositoryCard()`
- `formatDate()`
- `renderRepository()`

**Rubric:** externe data via Fetch API en afstemming interface/gegevens.

---

## Test A3 – HTTP 404

**Soort test:** API-foutafhandeling  
**Bewijsniveau:** sterk technisch bewijs

### Doel

Controleren of een HTTP-response met `response.ok === false` correct wordt afgehandeld.

### Voorwaarde

Noteer eerst de originele URL:

```text
https://api.github.com/repos/Sofia-bit-2025/wpfw-portfolio-sofia
```

### Teststappen

1. Wijzig tijdelijk `GITHUB_API_URL` naar:

```text
https://api.github.com/repos/Sofia-bit-2025/bestaat-niet-test
```

2. Sla `github.js` op.
3. Herlaad `index.html`.
4. Controleer de pagina.
5. Controleer de console.
6. Zet direct daarna de originele URL terug.

### Verwacht resultaat

Omdat `response.ok` `false` is:

- wordt een `Error` met de HTTP-status gegooid;
- wordt `#github-repositories` leeggemaakt;
- verschijnt:

```text
De repositorygegevens konden niet worden geladen. Probeer het later opnieuw.
```

- krijgt de status de class `api-status--error`;
- verschijnt een bewust gelogde technische fout in de console.

De consolemelding begint met:

```text
GitHub repository laden mislukt:
```

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

```js
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

en de `catch` in `initGitHubRepository()`.

---

## Test A4 – Geldige JSON met verkeerde structuur

**Soort test:** API-validatie-/foutafhandelingstest  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of JSON niet automatisch wordt gerenderd wanneer verplichte repositoryvelden ontbreken.

### Teststappen

1. Bewaar de originele API-URL.
2. Wijzig tijdelijk `GITHUB_API_URL` naar:

```text
https://api.github.com
```

3. Herlaad `index.html`.
4. Controleer pagina en console.
5. Zet daarna de originele repository-URL terug.

### Verwacht resultaat

De response bevat JSON, maar niet de minimale repositorystructuur.

`isValidRepository()` retourneert daarom `false`.

Vervolgens:

- wordt een `Error` gegooid met:

```text
Onverwachte GitHub API-response.
```

- wordt geen repositorykaart getoond;
- verschijnt de normale gebruikersgerichte API-foutmelding;
- wordt de technische fout bewust met `console.error()` gelogd.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

`isValidRepository()` controleert minimaal:

- `name`;
- `html_url`;
- `updated_at`.

---

## Test A5 – Echte `fetch()`-/netwerkfout

**Soort test:** API-netwerkfouttest  
**Bewijsniveau:** extra technisch bewijs

### Doel

Controleren of een request dat helemaal geen HTTP-response oplevert ook door de `catch` wordt afgehandeld.

### Voorwaarde

Bewaar de originele GitHub-URL.

### Teststappen

1. Wijzig tijdelijk `GITHUB_API_URL` naar:

```text
https://example.invalid/
```

2. Sla `github.js` op.
3. Herlaad `index.html`.
4. Controleer de pagina.
5. Controleer de console.
6. Zet de originele GitHub-URL terug.

### Verwacht resultaat

`fetch()` kan geen geldige response ophalen en reject de Promise.

De `catch` moet daarna:

- de repositorylijst leegmaken;
- de gebruikersgerichte foutmelding tonen;
- `api-status--error` activeren;
- de technische fout met `console.error()` loggen.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `fetchRepository()`
- `try...catch` in `initGitHubRepository()`

---

# 7. Responsive gedrag

Responsive gedrag is aanvullende kwaliteitscontrole. Opdracht 2 bouwt voort op de responsive basis van Opdracht 1.

## Test R1 – Mobiel 375px

**Soort test:** responsive browsertest  
**Bewijsniveau:** aanvullend bewijs

### Teststappen

1. Stel viewportbreedte in op `375px`.
2. Open:
   - `index.html`;
   - `projects.html`;
   - `blog.html`;
   - `contact.html`.
3. Controleer navigatie en tekst.
4. Test op `projects.html` zoeken en details.
5. Test het formulier.
6. Controleer de GitHub-kaart.
7. Controleer horizontale overflow.

### Verwacht resultaat

- De basislayout staat hoofdzakelijk onder elkaar.
- Navigatie blijft bruikbaar.
- Tekst blijft leesbaar.
- Zoekveld en formulier passen binnen het viewport.
- Dynamische kaarten blijven bruikbaar.
- Er ontstaat geen ongewenste horizontale scroll.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

Mobile-first CSS en de standaard styles vóór het `48em`-breakpoint.

---

## Test R2 – Tablet / breakpoint 768px

**Soort test:** responsive browsertest  
**Bewijsniveau:** aanvullend bewijs

### Voorwaarde

Bij de standaard browserfontgrootte komt `48em` ongeveer overeen met `768px`.

### Teststappen

1. Stel de viewport in op `768px`.
2. Open de vier pagina's.
3. Controleer header, hero en contactlayout.
4. Controleer dynamische onderdelen.

### Verwacht resultaat

Vanaf het `48em`-breakpoint:

- `.site-header__inner` gebruikt een horizontale layout;
- `.hero__inner` staat horizontaal;
- sections gebruiken grotere verticale spacing;
- `.contact-list__item` gebruikt twee kolommen;
- interactieve onderdelen blijven bruikbaar;
- er ontstaat geen ongewenste horizontale scroll.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

```css
@media (min-width: 48em)
```

---

## Test R3 – Desktop 1440px

**Soort test:** responsive browsertest  
**Bewijsniveau:** aanvullend bewijs

### Teststappen

1. Stel de viewport in op `1440px`.
2. Open alle vier pagina's.
3. Controleer containers, kaarten, navigatie en formulieren.
4. Test de dynamische onderdelen opnieuw.

### Verwacht resultaat

- De content blijft binnen de ingestelde containerbreedte.
- Layout wordt niet onnodig over de hele schermbreedte uitgerekt.
- Navigatie, kaarten en formulier blijven leesbaar.
- Project- en GitHub-functionaliteit blijft bruikbaar.
- Er ontstaat geen ongewenste horizontale scroll.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

- `.container`
- `.card-grid`
- `--container-width`
- `@media (min-width: 48em)`

---

# 8. Browserconsole

## Test C1 – Normaal gebruik zonder onverwachte JavaScript-errors

**Soort test:** technische browsertest  
**Bewijsniveau:** kernbewijs

### Doel

Controleren of de normale DOM-interacties zonder onverwachte consolefouten werken.

### Voorwaarde

- originele GitHub API-URL is hersteld;
- internetverbinding werkt;
- console is eerst leeggemaakt.

### Teststappen

1. Open DevTools → Console.
2. Herlaad `index.html`.
3. Laat de GitHub-data laden.
4. Open `projects.html`.
5. Zoek op `JavaScript`.
6. Zoek op `xyz123`.
7. Wis de zoekterm.
8. Open en sluit technische details.
9. Open `contact.html`.
10. Test ongeldige invoer.
11. Test geldige invoer.
12. Controleer de console.

### Verwacht resultaat

Tijdens normaal gebruik verschijnen geen onverwachte JavaScript-errors.

De bewust veroorzaakte errors uit A3, A4 en A5 vallen niet onder deze test. Bij die negatieve API-tests is `console.error()` onderdeel van de geïmplementeerde foutafhandeling.

### Werkelijk resultaat

Nog niet uitgevoerd.

### Status

**Nog niet getest**

### Bewijs

De rubric vereist dat de twee DOM-interacties correct werken zonder fouten in de browserconsole.

---

# 9. Statische code-inspectie

## Test K1 – Externe en opgesplitste JavaScript-code

**Soort test:** handmatige code-inspectie  
**Bewijsniveau:** rubricbewijs

### Doel

Controleren van het rubriccriterium over testbare en herbruikbare codestructuur.

### Teststappen

Controleer:

1. `projects.html`;
2. `contact.html`;
3. `index.html`;
4. `assets/js/projects.js`;
5. `assets/js/contact.js`;
6. `assets/js/github.js`.

Controleer of:

- JavaScript in externe `.js`-bestanden staat;
- functionaliteit is verdeeld over benoembare functies;
- filtering, rendering, validatie, API-verwerking en statusupdates aparte verantwoordelijkheden hebben;
- functies waar relevant data of DOM-elementen via parameters ontvangen.

### Verwacht resultaat

De implementatie bevat onder andere afzonderlijke functies zoals:

```text
filterProjects()
renderProjects()
createProjectCard()
getErrorMessage()
validateField()
validateForm()
fetchRepository()
createRepositoryCard()
setApiStatus()
```

De pagina's laden de scripts extern met `defer`.

### Werkelijk resultaat

Nog niet als afzonderlijke handmatige codecontrole vastgelegd.

### Status

**Nog niet getest**

### Bewijs

- `assets/js/projects.js`
- `assets/js/contact.js`
- `assets/js/github.js`

**Rubric:** testbare, herbruikbare codestructuur.

---

# 10. Rubricdekking

| Rubriccriterium | Belangrijkste bewijs |
|---|---|
| Interactief gedrag met de DOM | P2, P4, P6, P7, P8, C1 |
| Formulier met invoervalidatie | F1 t/m F12 |
| Toegankelijke gebruikersfeedback | F1, F10, F11, F12, T1, T2, T3 |
| Afstemming interface en gegevens | P1, P2, A2 |
| Externe data via Fetch API | A1 t/m A5 |
| Testbare/herbruikbare codestructuur | K1 + broncode |

Voor het criterium **testbare/herbruikbare codestructuur** blijft de broncode zelf het belangrijkste bewijs. Browsergedrag kan niet zelfstandig aantonen hoe functies intern zijn georganiseerd.

---

# 11. Fouten en hertests

Wanneer tijdens de uitvoering een test niet slaagt, gebruik ik onderstaande structuur.

## Hertest-template

### Test

`[testnummer + naam]`

### Eerste status

**Niet geslaagd** / **Gedeeltelijk geslaagd**

### Verwacht resultaat

`[wat had moeten gebeuren]`

### Werkelijk resultaat

`[wat daadwerkelijk gebeurde]`

### Probleem

`[concrete afwijking]`

### Oorzaak

`[indien vastgesteld]`

### Aanpassing

`[bestand + concrete codewijziging]`

### Herteststappen

`[welke stappen opnieuw zijn uitgevoerd]`

### Werkelijk resultaat na hertest

`[concreet resultaat]`

### Nieuwe status

**Geslaagd** / **Niet geslaagd** / **Gedeeltelijk geslaagd**

---

# 12. Eindcontrole

Vink een regel alleen af nadat de bijbehorende test daadwerkelijk is uitgevoerd.

## Kernfunctionaliteit

- [ ] Project wordt vanuit `projects[]` dynamisch gerenderd.
- [ ] Zoeken op een bestaande term werkt.
- [ ] Een niet-bestaande zoekterm geeft de juiste empty state.
- [ ] Technische details kunnen worden geopend.
- [ ] Technische details kunnen worden gesloten.
- [ ] `aria-expanded` verandert correct.
- [ ] Normaal DOM-gebruik veroorzaakt geen onverwachte console-errors.

## Formulier

- [ ] Alle drie lege velden geven de juiste fout.
- [ ] Lege naam wordt correct afgehandeld.
- [ ] Lege e-mail wordt correct afgehandeld.
- [ ] Leeg bericht wordt correct afgehandeld.
- [ ] Naam korter dan 2 tekens wordt afgekeurd.
- [ ] Ongeldig e-mailformaat wordt afgekeurd.
- [ ] Bericht korter dan 10 tekens wordt afgekeurd.
- [ ] Alleen whitespace wordt niet als geldige naam geaccepteerd.
- [ ] `blur` valideert een veld.
- [ ] Foutfeedback herstelt tijdens nieuwe invoer.
- [ ] Focus gaat naar het eerste ongeldige veld.
- [ ] Geldige invoer geeft de juiste bevestiging.
- [ ] Geldige invoer veroorzaakt geen backendrequest.

## Toegankelijkheid

- [ ] `aria-describedby` verwijst naar de juiste foutcontainers.
- [ ] `aria-invalid` verandert correct.
- [ ] Dynamische statuscontainers gebruiken `role="status"`.
- [ ] Keyboardbediening is bruikbaar.
- [ ] Focusindicator is zichtbaar.
- [ ] Skip-link werkt.

## API

- [ ] Loading state is zichtbaar.
- [ ] Succesvolle GitHub-response wordt gerenderd.
- [ ] JSON-response komt overeen met de zichtbare data.
- [ ] HTTP 404 wordt zichtbaar afgehandeld.
- [ ] Onverwachte JSON-structuur wordt afgehandeld.
- [ ] Netwerk-/fetch-fout wordt afgehandeld.
- [ ] Negatieve API-tests tonen alleen de verwachte technische `console.error()`.

## Responsive

- [ ] 375px getest.
- [ ] 768px getest.
- [ ] 1440px getest.
- [ ] Geen ongewenste horizontale overflow gevonden.
- [ ] Dynamische onderdelen blijven bruikbaar op de geteste breedtes.

---

# 13. Prioriteit vóór definitieve inlevering

## Prioriteit 1 – noodzakelijk rubricbewijs

Voer minimaal deze tests daadwerkelijk uit en vul het werkelijke resultaat in:

- P1 – dynamische projectrendering;
- P2 – filteren;
- P6 en P7 – tweede DOM-interactie;
- F1 – drie verplichte velden;
- F6 – ongeldig e-mailformaat;
- F7 – minimale berichtlengte;
- F12 – geldige invoer en bevestiging;
- T1 – ARIA-koppeling van foutfeedback;
- A1 – loading state;
- A2 – succesvolle Fetch API + JSON-mapping;
- minimaal A3 of A5 – foutafhandeling;
- C1 – geen onverwachte console-errors;
- K1 – code-inspectie.

## Prioriteit 2 – belangrijk voor sterker/boven-niveau bewijs

Voer daarna uit:

- P3 – hoofdletters en whitespace;
- P4 – empty state;
- P5 – herstel na zoeken;
- P8 – meerdere interacties achter elkaar;
- F5 – grenswaarde naam;
- F8 – alleen whitespace;
- F9 – `blur`;
- F10 – herstel tijdens `input`;
- F11 – generieke focus op eerste fout;
- A3 – HTTP 404;
- A4 – onverwachte API-structuur;
- A5 – echte fetch-fout;
- T2 – dynamische `role="status"`-elementen;
- T3 – keyboardbediening;
- T4 – skip-link;
- R1, R2 en R3 – responsive controle.

## Prioriteit 3 – extra kwaliteit

Optioneel:

- T5 – `prefers-reduced-motion`;
- test in een tweede browser;
- test met een screenreader om daadwerkelijke aankondiging van `role="status"` te controleren;
- screenshots bewaren van belangrijke success-, error- en responsive states.

---

# 14. Conclusie

Dit bestand bevat het testplan en uiteindelijk het handmatige testbewijs voor Opdracht 2.

Op dit moment worden geen geslaagde resultaten geclaimd zolang de tests niet daadwerkelijk in de browser zijn uitgevoerd.

Na iedere uitgevoerde test vul ik:

```text
Werkelijk resultaat
→ Status
```

in.

Wanneer een fout wordt gevonden, documenteer ik daarnaast:

```text
verwacht gedrag
→ werkelijk gedrag
→ aanpassing
→ hertest
→ nieuwe status
```

Hierdoor blijft het bewijs herleidbaar van:

```text
rubric / requirement
→ implementatie
→ test
→ werkelijk resultaat
→ conclusie
```

---

# 15. AI-gebruik

ChatGPT is gebruikt voor:

- het vergelijken van het eerdere testplan met de definitieve broncode;
- het koppelen van tests aan de criteria van Opdracht 2;
- het verbeteren van teststappen, foutscenario's en edge cases;
- het structureren en herschrijven van dit testdocument.

De tests worden niet door AI als geslaagd gemarkeerd.

Ik voer de browsertests zelf uit en vul daarna zelf het werkelijke resultaat en de status in. Eventuele afwijkingen controleer ik opnieuw tegen mijn eigen HTML-, CSS- en JavaScript-code.