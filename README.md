# Tiffany Woods: Interactive Resume & Portfolio

An interactive resume and portfolio for Senior, Lead and Principal Product Manager roles. It's a static site (plain HTML, CSS and JavaScript) with no build step and no dependencies.

## What's inside

- **Fit check**: paste a job description or pick requirements to see matching evidence. Runs entirely in the browser; nothing is stored or sent.
- **Case studies**: self-service configuration proposal, release governance, requirements mockup, forms taxonomy and product vision.
- **Senior PM Proof-of-Work Kit**: a one-page PRD, an interactive 24-case eval set with a release gate, and an impact model with adjustable assumptions. Built around AI-assisted submission intake for commercial trucking underwriting.
- **Experience, skills and contact**, plus a downloadable resume.

## Files

```
index.html            Page structure and content
styles.css            Design and layout
data.js               Content data: skills evidence, experience, eval cases, impact model inputs
app.js                Interactivity
assets/               Images, resume (.docx) and eval set (.csv)
.nojekyll             Tells GitHub Pages to serve files as-is
```

## Publish with GitHub Pages

1. Create a new repository on GitHub (for example `portfolio`). Public repositories get free Pages hosting.
2. Upload the contents of this folder to the repository root: **Add file → Upload files**, then drag in everything, including the `assets` folder. Commit.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.

Tip: name the repository `<your-username>.github.io` to publish at `https://<your-username>.github.io/` directly.

## Preview locally

Open `index.html` in a browser, or run a local server from this folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Editing

- Most text lives in `index.html`.
- Skills evidence, experience, eval cases and impact model presets live in `data.js`.
- If you update the eval cases, also update `assets/Submission-Intake-Eval-Set.csv`.
- Fonts load from Fontshare (Zodiak, General Sans) and Google Fonts (JetBrains Mono).

## Notes

The Proof-of-Work Kit is a hypothetical scenario written for this portfolio, not a plan of any current or past employer or client. Views are my own.

© Tiffany Woods. All rights reserved.
