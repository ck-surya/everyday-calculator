# Everyday calculator

A static discount calculator built with HTML, CSS and JavaScript. No install or build step is needed. Calculations run locally in the browser. Analytics is not installed.

## Run locally

From this directory:

```bash
python3 -m http.server 5173
```

Open http://localhost:5173. Stop with Ctrl+C. Use the HTTP server rather than opening index.html directly: JavaScript modules need HTTP delivery.

## Check the arithmetic

With Node.js 18 or newer:

```bash
node --test tests/calculations.test.mjs
```

Also check the browser: submit empty fields; calculate 2500 at 20% (2000 final, 500 saved); try 0% and 100%; reject negative values and 101%; use presets, reset and example; use Tab and Enter; inspect a narrow screen and console errors.

## Understand the files

- index.html: accessible form, result area, examples and explanation.
- assets/styles.css: responsive layout, colours, typography and focus styles.
- assets/calculations.mjs: validation and arithmetic, independent of the interface.
- assets/app.js: form events and display updates.
- tests/calculations.test.mjs: calculation boundary checks.
- about.html, privacy.html, 404.html: supporting pages.
- WEBSITE_PLAN.md: full learning and delivery roadmap.
- design/: visual design evidence and local browser checks. The browser checks currently reference the workstation's Playwright installation; they are development helpers, not portable prerequisites.

## Publish with GitHub Pages

1. Create an empty public GitHub repository for this project, for example `everyday-calculator`.
2. Push this local repository to it using the commands below.
3. In repository Settings → Pages → Source, select **GitHub Actions**.
4. In Actions, run **Test and publish calculator** (or push a new commit). The workflow tests the arithmetic, stages only public assets, generates canonical URLs and a sitemap using the actual Pages URL, then deploys.
5. Open the deployment URL and check calculations, direct page loads, CSS/module requests, and HTTPS. Test a nested missing URL to verify the custom 404 links.
6. Verify Search Console and submit `/sitemap.xml`. Analytics is a separate next step.

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Authenticate to GitHub using your normal local Git login or GitHub CLI. Never paste an access token into chat.

The workflow publishes only `_site/`; plans, test scripts, design evidence, and README are excluded from the hosted site. Public repository source remains visible on GitHub. `_site/` is generated and excluded from Git history.

To preview a generated release locally, set `SITE_URL` to your real HTTPS URL and run `python3 scripts/build.py`, then `python3 -m http.server 5173 --directory _site`.

A custom domain is optional. Confirm current Pages setup instructions at https://docs.github.com/en/pages/getting-started-with-github-pages when publishing.

To undo a release, revert the relevant commit and push the revert; confirm the redeployed site works. The deployment workflow is prepared; a remote repository and GitHub Pages configuration are still required.

## Next learning exercise

Change one preset discount, explain the formula in your own words, run the tests, and verify the result in the browser. Then publish the first version before adding more calculators.
