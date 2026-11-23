# Everyday Calculator: build, publish, discover, and improve

Prepared 23 November 2026. This is a learning and delivery plan, not a claim that the website has already been built or published.

## 1. Outcome and scope

Build a useful, mobile-friendly website and understand every stage: requirements, HTML, CSS, JavaScript, Git, testing, hosting, DNS, HTTPS, search visibility, analytics, and ongoing improvements.

Assumptions: beginner learning path; English first; global audience; currency-neutral calculations with INR examples; GEO means generative engine optimization. Suggested effort: 30–45 focused hours across 4–6 weeks, plus time to collect real visitor data. This is an estimate, not a deadline or traffic promise.

Start with a discount calculator. Example: price 1,000 and discount 20% gives savings 200 and final price 800. Add percentage and bill-splitting calculators only after the first complete deployment works.

Version 1 includes labelled inputs, clear results, validation, reset, worked examples, formulas, keyboard access, responsive layout, supporting content, and measured interactions. Defer accounts, databases, payments, ads, AI features, currency exchange rates, and financial or tax advice. These add complexity without advancing the initial learning objective.

Differentiation: make the result easy to understand, show the working, support small screens, and explain common mistakes. Generic calculators face strong competition; usefulness and learning are the first goals.

## 2. Technology and architecture

Use semantic HTML, plain CSS, and JavaScript modules. Keep explanatory content in the HTML so it is available before JavaScript executes. Separate calculation functions from interface handling. Use Git and GitHub for history, and GitHub Pages as the initial static host. Use a small local HTTP server during development.

The browser downloads HTML, CSS, and JavaScript over HTTPS. JavaScript validates input and computes results locally. Optional analytics requests go to the selected analytics providers after the appropriate consent choice. There is no application server or database in version 1.

Suggested structure:

```text
index.html
calculators/discount/index.html
calculators/percentage/index.html
calculators/split-bill/index.html
about/index.html
privacy/index.html
404.html
assets/css/styles.css
assets/js/calculations.js
assets/js/calculator-ui.js
assets/js/analytics.js
tests/calculations.test.js
robots.txt
sitemap.xml
README.md
```

Only create pages when they contain finished, distinct content. Use deployment-base-aware links and assets: GitHub project sites may live under /repository-name/. Keep the site base URL in one documented place for sitemap and canonical generation or updates.

Tools: editor, browser developer tools, Git, GitHub, Google Search Console, Google Analytics 4 (GA4), Microsoft Clarity, and PageSpeed Insights. Install analytics progressively so their purposes remain clear. Never put account secrets in browser code or Git history.

## 3. Milestones and acceptance criteria

### Milestone 1 — Understand the web and define the product (3–4 hours)

Learn files versus URLs, browser versus server, domain versus hosting, HTTP/HTTPS, and the roles of HTML/CSS/JavaScript. Sketch a single mobile screen. Write user stories: calculate savings, understand the formula, correct an invalid value, reset and calculate again.

Deliverables: page sketch, input rules, expected results, repository with README and first commit.

Done when you can explain what happens between entering a URL and seeing a result.

### Milestone 2 — Build the discount calculator (6–8 hours)

Create the form and content in HTML, style mobile first, and connect JavaScript. Use a Calculate button initially so the action and analytics are unambiguous. Keep entered values when validation fails; explain the error next to the field. Announce results and errors appropriately to assistive technology without repeatedly interrupting the user.

Rules: price must be finite and nonnegative; discount must be from 0 through 100; empty input is not zero; explicitly define whether exponent notation is accepted; reject unsupported formats. Select a sensible documented maximum magnitude. Calculate at full precision and format the display to two decimals. Explain that displayed money values are rounded.

Core formulas:

- Savings = original price × discount / 100.
- Final price = original price − savings.

Acceptance cases: 1,000 at 20% → 800 final and 200 savings; 0% → unchanged price; 100% → zero final price; blank, negative, nonfinite, and over-100 discount → clear errors. Include decimal inputs and rounding cases.

Done when the tool works with mouse, keyboard, and a narrow phone screen and has meaningful calculation tests.

### Milestone 3 — Quality and content (4–6 hours)

Add formula, worked example, rounding note, and a few real questions users might ask. Add navigation, About, Privacy, and a useful 404 page. Provide visible focus indicators, explicit labels, sufficient contrast, readable errors, and comfortable touch controls. Do not rely on colour alone.

Check at approximately 360px width, tablet width, and desktop; 200% zoom; keyboard-only navigation; at least two browser engines where available; slow connection; JavaScript disabled (explanation remains readable and the tool explains its requirement).

Use automated tests for calculation boundaries and a small browser smoke test for form submission and invalid input. Inspect console and network errors. Use Lighthouse as a diagnostic, not proof of accessibility or real-user speed.

Done when formulas pass tests, all links work, the page has no horizontal overflow, and results are understandable without explanation from the developer.

### Milestone 4 — Publish and learn operations (3–5 hours)

1. Commit the verified site and push it to GitHub.
2. Configure GitHub Pages for the chosen branch or deployment workflow.
3. Check the live URL, nested-page refreshes, asset paths, navigation, and 404 behavior.
4. Enable/enforce HTTPS where available and confirm no mixed content.
5. Optionally buy a domain after reviewing its renewal cost; configure the records required by the host and verify domain ownership.
6. Pick one preferred hostname and check redirects and canonical URLs.
7. Update absolute sitemap/canonical URLs for the final domain.
8. Make a small change, redeploy, and practise reverting it using Git.

Deliverables: live website, documented deployment instructions, and rollback procedure. A custom domain is optional. Review current host limits and terms before commercial expansion.

Done when a second device can use the public site and you can explain how to release and undo a change.

### Milestone 5 — Search visibility: SEO and GEO (4–6 hours)

For each calculator, use a descriptive URL, unique title and description, one clear main heading, semantic sections, a direct explanation, formula, worked examples, and relevant internal links. Make mobile and desktop content consistent. Avoid publishing many near-identical pages targeting minor keyword variants.

Create a valid sitemap containing final, canonical, indexable URLs. Check robots.txt and absence of accidental noindex directives. A robots file controls crawling, not secure access. Verify the site in Search Console, submit the sitemap, inspect important URLs, and review indexing reports. Sitemap submission does not guarantee indexing or ranking.

Research real wording by reviewing search results and later Search Console queries; record likely intent rather than inventing search-volume numbers. Initial hypotheses include discount calculator, sale price calculator, percentage of a number, and split bill calculator.

Use structured data only when it truthfully describes visible content and is appropriate for the page. Do not add FAQ markup expecting a guaranteed search enhancement.

For GEO, make facts, formulas, assumptions, authorship, and update information clear. Cite primary sources where external factual claims require them. AI-search inclusion cannot be guaranteed. Google states that foundational SEO practices apply to its AI features; special AI schema or an llms.txt file is not a launch requirement for Google AI search.

Done when the deployed pages are accessible to crawlers, Search Console is verified, the sitemap is readable, and explanations are useful without operating the tool.

### Milestone 6 — Measure clicks and successful use (4–6 hours)

Use Search Console for search visibility, GA4 for usage events and acquisition, and Clarity for qualitative click/scroll patterns and session playback. These tools answer different questions. Review privacy and consent configuration before collecting visitor behavior; mask calculator inputs in recordings and avoid sending entered amounts, names, or contact details.

Proposed custom events:

| Event | Trigger | Allowed parameters |
|---|---|---|
| calculator_started | First input interaction per calculator per page load | calculator_type |
| calculation_completed | Successful explicit submission | calculator_type |
| validation_error | Rejected explicit submission | calculator_type, field_name, error_code |
| reset_clicked | Reset action | calculator_type |
| example_selected | Example fills the form | calculator_type, example_id |

Use stable controlled values for parameters. Do not attach raw input values. Do not fire a custom page-view event in addition to an existing automatic page-view setup. Register needed GA4 custom dimensions. Avoid duplicate listeners or both direct and tag-manager copies of the same tracking code.

Validate events in GA4 DebugView and browser network tools. Test accept, reject, and withdrawal behavior; test mobile and repeat submissions. Separate developer testing from production reports. Analytics will be incomplete because of consent choices, blockers, and delivery failures.

Define completion rate as distinct measured sessions with a successful calculation divided by distinct measured sessions with a calculator start, within the same reporting scope. Event counts alone can inflate completion because people calculate multiple times. Also inspect error sessions, mobile versus desktop, acquisition sources, and whether people reach useful explanations.

Done when one test journey produces the expected events once per action, contains no entered amounts, and respects the chosen consent configuration.

### Milestone 7 — Expand and improve (5–8 hours, plus observation)

Add a percentage calculator for “X percent of Y” and a split-bill calculator. Keep each tool focused rather than hiding multiple meanings behind an ambiguous percentage form.

Split-bill rules: positive integer people count, nonnegative amount, explicit tip percentage, and a clear rounding policy. For equal currency shares, handle the remainder in smallest currency units so the allocated shares add to the total, or explain that the displayed equal share is approximate. Test 100 divided among 3 people.

Invite a small group to try the deployed site and observe with their knowledge. Ask whether they understood the output and where they hesitated. Do not send invitations automatically. Collect real observations before adding more features.

Review weekly: indexing, search queries, broken pages, usage funnel, common errors, and relevant recordings. Example hypothesis: clearer discount wording reduces validation errors. Make one change, annotate its release date, and compare similar periods. Small samples are directional evidence; use a formal A/B test only when traffic supports it.

Done when the site has three verified tools, one documented user-feedback finding, and one measured improvement.

## 4. Performance and launch checklist

Use small assets, system fonts initially, minimal JavaScript, and no unnecessary libraries. Review analytics-script overhead. Target good Core Web Vitals: LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, CLS ≤ 0.1, assessed at the 75th percentile of real visits. A new site may not have enough field data; lab checks help find issues but do not establish a field-data pass.

Before inviting visitors confirm: correct formulas; working keyboard and mobile flow; no console errors; live HTTPS; working direct URLs and 404; accurate titles and canonical URLs; sitemap; Search Console setup; tested analytics and consent; input masking; privacy text matching actual behavior; deployment and rollback notes.

## 5. Costs and practical constraints

Aim to start with no paid services, subject to current account eligibility and provider limits. Domain registration is optional and recurring; compare renewal pricing before purchase. No paid APIs are needed. Do not buy SEO tools, ads, or an AI subscription just for this project. Account access and optional domain purchase are later setup dependencies, not prerequisites for local development.

Learning success: you can explain and independently edit the site, run checks, publish, inspect a search report, verify an analytics event, and use evidence to improve a flow. Traffic success is a separate outcome and depends on demand, competition, distribution, and time.

## 6. Working rhythm

For each milestone: explain the concept, implement a small piece, run it, verify behavior, commit it, and write a short note in your own words. Keep a decision log with the choice, reason, and evidence. Use AI to explain and review code; make sure you can explain generated functions before accepting them.

Suggested weeks: week 1 fundamentals and calculator; week 2 quality and first deployment; week 3 SEO and measurement; week 4 additional tools and user feedback. Spread across weeks 5–6 if needed. Search and usage observation continues after this build schedule.

## 7. Primary references

- Web fundamentals and setup: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started
- GitHub Pages deployment: https://docs.github.com/en/pages/getting-started-with-github-pages
- Custom-domain troubleshooting: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google AI search features: https://developers.google.com/search/docs/appearance/ai-features
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- GA4 setup verification: https://developers.google.com/analytics/devguides/collection/ga4/troubleshoot
- Clarity installation: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
- Clarity consent management: https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management

Provider documentation and interfaces change. Recheck relevant setup documentation when implementing each integration.
