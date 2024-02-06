# My Personal Website

This website houses my resume, as well as some blog posts and project descriptions.

## Installation

1. Clone the repository
2. Run `npm install`

## Configuration

The build is configured via `.eleventy.js`. It is configured to

- Copy `/views/public/` to the output
- Compile and minify `.scss` files to `.css`
- Change the input directory to `/views/`, rather than the root directory of the project

There are some VSCode settings in `/.vscode/settings.json` reguarding markdown and nunjucks formatting.

## Development

Run `npx @11ty/eleventy --serve` to start a file watch and a server, which will automatically reload pages that have changes.

## Deployment

The workflow in `.github/workflows/main.yml` will automatically build and deploy the site when there are changes on the `main` branch.
