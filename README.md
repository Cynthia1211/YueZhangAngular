# Yue Zhang Portfolio

An Angular portfolio website featuring project details, profile information, and contact links. The application uses Angular 19, Angular Material, and Firebase.

## Requirements

- Node.js 18.19.1 or newer (or a supported newer LTS release)
- npm

## Run locally

From the project root, install the locked dependencies and start the development server:

```bash
npm ci
npm start
```

Open [http://localhost:4200](http://localhost:4200). The development server reloads the app when source files change. Stop it with `Ctrl+C`.

If `npm ci` reports a peer dependency resolution error, use the same install option as the deployment workflow:

```bash
npm ci --legacy-peer-deps
```

## Available commands

| Command | Description |
| --- | --- |
| `npm start` | Start the local Angular development server. |
| `npm run build` | Create a production build in `dist/assignment-yue-zhang/browser/`. |
| `npm test` | Run the unit tests with Karma. |
| `npm run watch` | Rebuild when source files change, using the development configuration. |

## Project layout

- `src/app/` — Angular components, routes, services, and data models
- `src/environments/` — environment configuration, including Firebase client settings
- `public/data/` and `public/images/` — portfolio content and images copied into the build
- `.github/workflows/deploy.yml` — GitHub Actions workflow for deployment to Amazon S3

The Firebase values in the client environment are included in the browser bundle. Keep private credentials and deployment secrets in GitHub Actions secrets; never add private keys or service account credentials to the frontend.

## Deployment

The GitHub Actions workflow builds the app and syncs `dist/assignment-yue-zhang/browser/` to the configured S3 bucket when changes are pushed to `master`. It expects `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to be configured as repository secrets.
