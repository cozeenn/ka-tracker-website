# KA-TRACKER

Responsive, original website built with Vite and plain JavaScript. All illustrations are original SVGs; no competitor assets are used. Google Fonts supplies Manrope and DM Sans with local system fallbacks.

## Preview

Run `npm install`, then `npm run dev`. Production: `npm run build`, deploy `dist/` on any static host. On PowerShell with restricted execution policies, use `npm.cmd`.

GitHub Pages deployment is configured in `.github/workflows/deploy.yml`. Once Pages is enabled with GitHub Actions as its source, pushes to `main` build and publish the site at `https://cozeenn.github.io/ka-tracker-website/`. The production base path is configured in `vite.config.js`; update it if moving to another host or a custom domain.

## Before launch

The supplied logo is installed unchanged at `public/ka-tracker-logo.jpg` and used in the header, footer, favicon, and social-sharing metadata. Its proportions are preserved. Edit `src/config.js` to supply phone, email, service area, Facebook URL, and public website origin. Empty contacts do not produce contact links.

Confirm proposed features, installation copy and arrangements, subscription terms, compatibility, app access, and FAQs. Update answers, then set the feature/installation confirmation flags. Review and replace draft privacy text with approved business details. 

## Showcase website

This site showcases solutions and illustrative tracking concepts. There is no quote form or submission backend. Real installation photos and customer project descriptions can be added when supplied; concept previews are not presented as completed work.

## Verification

`npm test` runs browser checks (requires Playwright Chromium). Includes desktop/mobile overflow, navigation/menu, FAQ keyboard interaction, privacy dialog, showcase links and absence of quote forms. `npm run build` creates the production bundle. The tracking UI is always labeled illustrative and uses sample data.
