# KA-TRACKER

Responsive, original website built with Vite and plain JavaScript. All illustrations are original SVGs; no competitor assets are used. Google Fonts supplies Manrope and DM Sans with local system fallbacks.

## Preview

Run `npm install`, then `npm run dev`. Production: `npm run build`, deploy `dist/` on any static host. On PowerShell with restricted execution policies, use `npm.cmd`.

GitHub Pages deployment is configured in `.github/workflows/deploy.yml`. Once Pages is enabled with GitHub Actions as its source, pushes to `main` build and publish the site at `https://cozeenn.github.io/ka-tracker-website/`. The production base path is configured in `vite.config.js`; update it if moving to another host or a custom domain.

## Before launch

The supplied logo is installed unchanged at `public/ka-tracker-logo.jpg` and used in the header, footer, favicon, and social-sharing metadata. Its proportions are preserved. Edit `src/config.js` to supply phone, email, service area, Facebook URL, and public website origin. Empty contacts do not produce contact links.

Confirm proposed features, installation copy and arrangements, subscription terms, compatibility, app access, and FAQs. Update answers, then set the feature/installation confirmation flags. Review and replace draft privacy text with approved business details. Update the quote FAQ when enabling submission.

## Form integration

With an empty `formEndpoint`, the form validates locally and explicitly says nothing was sent or saved. No localStorage, analytics, or tracking cookies are used. Set `formEndpoint` to a backend that accepts JSON fields `name`, `email`, `mobile`, `vehicle`, `count`, and `message`. The backend must validate input, rate-limit abuse, deliver/store the inquiry reliably, and return HTTP 2xx with `{ "success": true }` only after accepting it. Configure CORS for your deployed origin if needed. Never put mail-service secrets in the client. Test real delivery before publishing. Request timeouts and unconfirmed responses never show success.

## Verification

`npm test` runs browser checks (requires Playwright Chromium). Includes desktop/mobile overflow, navigation/menu, FAQ keyboard interaction, privacy dialog, required/email/mobile/count validation, and demo submission. `npm run build` creates the production bundle. The tracking UI is always labeled illustrative and uses sample data.
