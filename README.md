# Sameiet Kampen Hageby 2

Nettsiden er laget for GitHub Pages. Innholdet ligger i Markdown-filer; designet ligger i Jekyll-maler og `styles.css`. Styret trenger ikke endre HTML eller CSS for å publisere nyheter, endre tekst eller legge til dokumentlenker.

## Enklest: visuell redigering med Pages CMS

1. Publiser først prosjektet på GitHub Pages (se under).
2. Gå til [app.pagescms.org](https://app.pagescms.org/) og logg inn med GitHub.
3. Gi Pages CMS-appen tilgang til **kun dette repositoriet** dersom GitHub tilbyr det valget. Tjenesten trenger skrivetilgang for å lagre endringer.
4. Åpne repositoriet i Pages CMS. Filen `.pages.yml` setter opp en visuell redigerer for **Nyheter**, **Publiserte dokumenter**, **Ofte stilte spørsmål**, **Forside**, **Retningslinjer for bebyggelsen**, **Dokumenter fra sameiet** og **Leverandører og tjenester**.
5. Velg **Nyheter → Ny**, skriv overskrift, dato, kort ingress og melding, og lagre. Innlegget vises automatisk øverst på forsiden når GitHub Pages har bygget siden på nytt. Hvert innlegg får også sin egen side.
6. For dokumenter: Åpne **Publiserte dokumenter → Ny**, skriv dokumenttittel, velg eller last opp PDF i feltet **PDF-dokument**, fyll inn dato og eventuelt dokumenttype/beskrivelse, og lagre. Dokumentet vises automatisk på siden **Dokumenter fra sameiet** og blir søkbart etter at GitHub Pages har bygget nettstedet på nytt. Du trenger ikke skrive en lenke eller Markdown. Legg til eksterne leverandørlenker på siden **Leverandører og tjenester**.
7. For spørsmål og svar: Åpne **Ofte stilte spørsmål → Ny**, skriv spørsmålet og svaret i feltene. Oppføringen vises automatisk på FAQ-siden og blir søkbar.

Pages CMS er en **valgfri tredjepartstjeneste**. Den lagrer endringer direkte i GitHub-repositoriet, ikke i en egen innholdsdatabase. Gi kun de personene som skal publisere, tilgang, og vurder alltid hvilke rettigheter dere gir GitHub-appen. Nettsiden fortsetter å fungere uten Pages CMS.

## Uten CMS: rediger Markdown i GitHub

- **Ny melding:** Opprett en fil i `_posts/` med navn `ÅÅÅÅ-MM-DD-kort-tittel.md`. Kopier oppsettet fra et eksisterende innlegg og erstatt tittel, dato, kategori, ingress (`summary`) og selve teksten under `---`. Nyheter sorteres etter dato, nyeste først.
- **Retningslinjer:** Rediger `retningslinjer.md`.
- **Dokumenter fra sameiet:** Opprett en Markdown-fil i `_dokumenter/` med dokumentets `title`, `file` (sti til PDF i `filer/`), `date` og eventuelt `category` og `summary` i YAML-front matter. Jekyll viser og indekserer filen automatisk. Den enkleste metoden er likevel Pages CMS-feltet **Publiserte dokumenter**.
- **Ofte stilte spørsmål:** Opprett en Markdown-fil i `_faq/` med spørsmålet som `title` i YAML-front matter og svaret under front matter. Jekyll viser og indekserer oppføringen automatisk. Bruk Pages CMS-feltet **Ofte stilte spørsmål** for visuell redigering.
- **Leverandører og tjenester:** Rediger `leverandorer.md`.
- **Introduksjonen på forsiden:** Rediger `index.md`.

I Markdown betyr `##` en overskrift, `**tekst**` uthevet tekst og `[lenketekst](adresse)` en lenke. GitHubs redigeringsside har forhåndsvisning før du lagrer. Ikke legg personopplysninger, upubliserte vedtak eller andre private dokumenter i repositoriet: **GitHub Pages og filer i et offentlig repo er åpne for alle**, også hvis de ikke er lenket fra nettsiden.

Gjeldende vedtekter og regler er **ikke** levert som del av dette prosjektet. Teksten på retningslinjesiden er tydelig merket som generell veiledning; styret må selv kontrollere og publisere godkjent innhold. Forsideinnlegget er en introduksjon til nettsiden, ikke et styrevedtak.

## Publisering på GitHub Pages

1. Opprett et offentlig GitHub-repo og legg prosjektfilene i repoets rotmappe.
2. I GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**. Velg hovedgrenen og **/(root)**, og lagre. GitHub Pages bygger Markdown-filene med Jekyll automatisk. Ikke legg til en `.nojekyll`-fil.
3. I `_config.yml` er `baseurl` satt til `/kampen-hageby-2-test`. Dette må stemme med **repoets navn** for en prosjektside på `brukernavn.github.io/kampen-hageby-2-test/`. Hvis repoet heter noe annet, endre verdien til `/<repo-navn>` **og** oppdater `output`-stiene i `.pages.yml` til `/<repo-navn>/assets/uploads` og `/<repo-navn>/filer`. Ved eget domene eller en brukerside (`brukernavn.github.io`), bruk `baseurl: ""` og `output: /assets/uploads` / `output: /filer`.
4. Etter hver lagrede endring tar det normalt litt tid før GitHub Pages viser ny versjon. Hvis siden ikke oppdateres, se byggeloggen under **Actions** i GitHub.

Hvis GitHub Pages i stedet er konfigurert med egen GitHub Actions-workflow, må denne støtte Jekyll; ren opplasting av filene uten bygging vil **ikke** vise Markdown-sidene.

## Bilder og lisens

Bildene er områdefoto fra Kampen hageby, **ikke bekreftet som foto av Sameiet Kampen Hageby 2**. Begge er fotografert av Jan-Tore Egge og publisert på Wikimedia Commons under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/):

- `assets/kampen-hageby.jpg`: [Kampen hageby II](https://commons.wikimedia.org/wiki/File:Kampen_hageby_II.jpg), nedskalert fra originalen.
- `assets/hedmarksgata.jpg`: [Hedmarksgata ved Kampen hageby](https://commons.wikimedia.org/wiki/File:Hedmarksgata_ved_Kampen_hageby.jpg), nedskalert fra originalen.

Fotograf, kilde og lisens er også lenket ved bildene på nettsiden. Bilder som lastes opp senere må ha avklart publiseringsrett.
