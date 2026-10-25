# Self Made Auto Detailing LLC

A responsive, single-page static website built with HTML, CSS and vanilla JavaScript. It has no build step, no JavaScript frameworks, and no remote font or icon dependencies.

## Files

- `index.html` — page structure, navigation, services, gallery, testimonials and contact.
- `style.css` — responsive layout, red/black theme, hover effects, fades and reduced-motion support.
- `script.js` — mobile navigation, scroll progress, fade-in observer and accessible gallery lightbox.
- `assets/media/` — supplied logo and vehicle photos, a cropped vehicle-seat photo, and illustrative AI-generated detail visuals.
- `assets/reviews/` — source screenshots for the three reviews. The website uses clean text cards, not screenshots.
- `assets/reference/` — listing and services screenshots kept for reference. These are not embedded in the page.

## Run locally

Open `index.html` in a modern browser. No server or build tool is required.

## Deploy to GitHub Pages

1. Create or open the GitHub repository for the website.
2. Extract the ZIP and upload its top-level contents to the repository root (so `index.html` is at the root next to `style.css`, `script.js`, and `assets/`).
3. Commit the files.
4. In **Settings → Pages**, select the branch and `/ (root)` folder, then save.
5. Open the generated GitHub Pages URL after deployment completes.

## Contact and listing details

The supplied Google Maps listing screenshots show the phone number `+1 (559) 847-5297` and hours of 7:00 AM–8:00 PM daily. These are used as provided by the project owner. A web search also surfaced the same number in an unrelated directory result, and I could not independently verify a matching public listing for Self Made Auto Detailing LLC. Please confirm the number is correct before publishing. The directions button opens the exact Maps URL provided by the project owner: `https://maps.app.goo.gl/AeLHqE9M2PNodVKy9?g_st=ac`.

The location/address was not reliably readable from the submitted screenshots, so the website links to the Maps listing rather than inventing a street address. Call or text links are provided; no email, pricing, or unprovided service guarantees are invented.

## Images and accuracy

- The logo, black sedan, foam-covered vehicle, interior-seat crop, reviews and reference screenshots come from user-provided files.
- The hero studio image, interior-cleaning image and studio foam-wash image are AI-generated illustrative visuals included locally in `assets/media/`. They are not represented as documented customer jobs.
- The services mirror the submitted listing screenshot: auto detailing, interior vacuuming, car waxing, clay bar treatment, engine detailing, full body wash, headlight polishing, seat shampooing and steam cleaning.
- Review cards transcribe the three supplied 5-star customer snippets. Review screenshots are kept as source references but are never rendered in the site.

## Accessibility and performance notes

- Responsive from small mobile widths to desktop.
- Keyboard accessible navigation and image lightbox, including Escape and arrow keys.
- Reduced-motion media query disables movement-heavy animation.
- Images are local, compressed and mostly lazy-loaded. The hero image is preloaded.
