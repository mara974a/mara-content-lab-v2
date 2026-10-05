# Mara Content Lab

A dark, image-led editorial landing page for Mara Content Lab. The site is built with Next.js, TypeScript, and the App Router and is configured for static export to Cloudflare Pages.

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Then open http://localhost:3000

## Build the site

```bash
npm run build
```

## Deploy to Cloudflare Pages

1. Push this project to a GitHub repository.
2. In Cloudflare Pages, choose Create project > Connect to Git.
3. Select the repository and the branch to deploy.
4. Set the build command to:

```bash
npm run build
```

5. Set the output directory to:

```bash
out
```

6. Save and deploy.

If Cloudflare Pages prompts for a framework preset, select Next.js and ensure static export is enabled by the `output: "export"` setting in `next.config.ts`.

## Image asset locations

All supplied media assets live in the public folder:

- /public/media/hero.jpg
- /public/media/hero-mobile.jpg
- /public/media/motion.jpg
- /public/media/detail.jpg
- /public/media/texture.jpg
- /public/media/human-light.jpg
- /public/media/layout-reference.jpg

The layout-reference asset is used only as an art-direction reference and is intentionally not rendered in the website.

## Form configuration notes

The request form is implemented as a standard HTML form that posts directly to FormSubmit:

```text
https://formsubmit.co/mara974a@gmail.com
```

The form includes the required hidden fields:

- `_subject = New Mara Content Lab request`
- `_captcha = false`
- `_template = table`

This is a manual review form. It does not create an automatic booking, and it does not imply a confirmed message delivery until the external provider completes a successful submission.

## Manual test checklist

- [ ] Hero image loads on desktop and mobile breakpoints.
- [ ] Navigation links jump to all section IDs.
- [ ] Mobile menu opens and closes correctly.
- [ ] Problem, sprint, process, sample, accountability, fit, about, FAQ, and request sections read clearly.
- [ ] FAQ accordion opens with keyboard and visible focus.
- [ ] Request form validates required fields and prevents invalid progression.
- [ ] Form documentation clearly states that the request is manually reviewed.
- [ ] Privacy and Terms pages render correctly.
- [ ] Reduced-motion mode disables decorative motion.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` succeeds.
- [ ] `git diff --check` succeeds.
