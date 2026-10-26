# Wellcare Bloom

A static website for Wellcare Bloom, built with HTML, CSS and JavaScript. No package installation is needed. The homepage sources are bundled by a small Python script.

## Run locally

After editing homepage sources, run `python3 scripts/build-home-runtime.py`. Then open `index.html` in a browser, or serve this folder with any static file server. For example:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000.

## Publish

The GitHub Actions workflow in `.github/workflows/pages.yml` rebuilds the homepage bundle and deploys the site to GitHub Pages whenever changes reach `main`. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The published address is `https://wellcarebloom.in/`.

## Pages

Home, About, Services, Journal, Contact, consultation, two journal articles, three legal information pages and a 404 page.

## Forms

Contact and consultation pages provide direct telephone, email and Google Maps links using the official Wellcare Physiotherapy contact information. Appointment confirmation is handled by the clinic. The newsletter form remains a local preview and does not subscribe visitors or persist information.

## Media

The homepage HTML is rendered during the build, with inline first-screen styles and a small independent reveal script. The loading cover has a 1.2-second budget; a delayed main bundle, font, below-fold image or video cannot hold it open. The rest of the stylesheet loads without blocking that first screen. A lightweight section skeleton remains while styles arrive, and native lazy images reserve their space. The video begins native streaming only within 900px of its section; glass refraction and portrait depth are optional enhancements. A complete page cannot be guaranteed within a fixed time on every connection, but distant media no longer blocks readable content or consultation links. Run `node scripts/check-startup.cjs` after the build to check these contracts. Images and fonts are stored locally in `assets/`. The original layout reference was created by Anton Drukarov and published at https://templatoria.com/. Some inherited images, fonts and audio came from that public reference; review and meet their licensing requirements before commercial use. Bloom posters and clinical copy were supplied by the client. Current clinic contact details are from https://wellcarephysiotherapy.in/contact.html.
