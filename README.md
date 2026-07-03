# MisoCloud Personal Site

Astro static site for `misocloud.com`, hosted from the `ksitjar.github.io` GitHub Pages repository.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build pulls the latest MisoCloud posts from `https://misocloud.substack.com/feed`. If the feed is unavailable, the site uses the curated fallback list in `src/data/fallbackPosts.ts`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages on pushes to `main`, on manual dispatch, and once daily so new Substack posts can appear without content commits.

After pushing, verify these GitHub/domain settings:

- In repository settings, set Pages source to GitHub Actions.
- Keep `public/CNAME` set to `misocloud.com`.
- At the domain registrar, point `misocloud.com` to GitHub Pages using GitHub's current apex-domain records.
- Add a `www` CNAME to `ksitjar.github.io` if you want `www.misocloud.com` to redirect or resolve too.
