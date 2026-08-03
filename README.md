# No Meat Proxy

A one-page site about not being a "meat proxy": someone who just copies AI output into a chat, email, or pull request without applying any of their own judgment.

Live at [nomeatproxy.com](https://nomeatproxy.com).

## Inspired by

- [Don't Be a Meat Proxy](https://gruhn.me/blog/2026-08-03/) — the post that named this problem
- [Don't ask to ask, just ask](https://dontasktoask.com/)
- [No Hello](https://nohello.net/en/)

## Deployment

The site is a single static `index.html` file, deployed to GitHub Pages via the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

One-time setup still needed in the repo settings:

1. Under **Settings > Pages**, set the source to **GitHub Actions**.
2. Under **Settings > Pages > Custom domain**, confirm `nomeatproxy.com` (from the [`CNAME`](CNAME) file) and make sure DNS for the domain points at GitHub Pages.
