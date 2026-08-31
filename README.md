# The One For

A handcrafted, multi-page web experience made as a personal gift. The site combines letters, small interactive moments, photo-led pages, and an intentionally playful visual system in a static deployment.

The custom domain recorded in `CNAME` is currently not resolving; the repository remains the canonical source.

![The opening screen of The One For](docs/images/theonefor-overview.jpg)

## Structure

- `index.html` — front door
- `pages/` — the individual scenes and notes
- `assets/` — fonts, images, audio, and shared visual material
- `.github/workflows/deploy.yml` — GitHub Pages deployment
- `CNAME` — custom-domain configuration

## Run locally

Because the project is static, any local HTTP server will work:

```bash
python3 -m http.server 4000
```

Then open `http://localhost:4000/`.

## Deploy

The repository is configured for GitHub Pages. See [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md) for the one-time Pages and DNS setup.
