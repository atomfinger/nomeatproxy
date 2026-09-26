# No Meat Proxy

A one-page site about not being a "meat proxy": someone who just copies AI output into a chat, email, or pull request without applying any of their own judgment.

Live at [nomeatproxy.com](https://nomeatproxy.com).

## Running locally

```bash
npm install
npm run serve
```

Then open `http://localhost:8080`. Use `npm run build` for a one-off static build into `_site/`.

## Translations

Also available in:

| Language | Language contributors 🎉 |
| --- | --- |
| [Türkçe](https://nomeatproxy.com/tr/) | [@deligoez](https://github.com/deligoez) |
| [Português (Brasil)](https://nomeatproxy.com/pt-br/) | [@mohvn](https://github.com/mohvn) |
| [Español (Argentina)](https://nomeatproxy.com/es-ar/) | [@matiaspalomeque](https://github.com/matiaspalomeque) |
| [日本語](https://nomeatproxy.com/ja/) | [@Shieru292](https://github.com/Shieru292) |
| [한국어](https://nomeatproxy.com/ko/) | [@greenheadHQ](https://github.com/greenheadHQ) |
| [Русский](https://nomeatproxy.com/ru/) | [@kuraysdev](https://github.com/kuraysdev) |
| [Беларуская](https://nomeatproxy.com/be/) | [@IamPiligrim](https://github.com/IamPiligrim) |
| [فارسی](https://nomeatproxy.com/fa/) | [@Adversarian](https://github.com/Adversarian) |

Want to add a translation? Excellent! Copy [`src/_data/translations/en.yaml`](src/_data/translations/en.yaml) to `<your-language-code>.yaml`, translate its values, and add an entry to [`src/_data/languages.json`](src/_data/languages.json). Run `npm test` to check your file against the schema, then make a PR.

Same if you're spotting a translation error.

## Inspired by

- [Don't Be a Meat Proxy](https://gruhn.me/blog/2026-08-03/) — the post that inspired this page.
- [Don't ask to ask, just ask](https://dontasktoask.com/)
- [No Hello](https://nohello.net/en/)
