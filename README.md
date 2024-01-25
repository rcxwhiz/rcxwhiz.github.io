# My Personal Website

This website houses my resume, as well as some blog posts and project descriptions.

## Installation

1. Clone the repository
2. Run `npm install`

## Configuration

The build is configured via `.eleventy.js`. It is configured to

- Copy `/views/js/` to the output
- Compile and minify `.scss` files to `.css`
- Change the input directory to `/views/`, rather than the root directory of the project

There are some VSCode settings in `/.vscode/settings.json` reguarding markdown and nunjucks formatting.

## Development

Run `npx @11ty/eleventy --serve` to start a file watch and a server, which will automatically reload pages that have changes.

## Deployment

This repository is configured to host GitHub from the `dist` branch. Github actions is currently configured to compile the static site and put the output into the `dist` branch when there is a push to `main`. Deployment is 100% automatic. 

The only thing that I would like to potentially add/fix is currently the `dist` branch is not cleared out before the newly built files are copied to it, at least that's what I think. This means that if I were to make changes that removed certain files from the built site, those files would persist on the deployed site. I need to find some sort of action plugin or something to clear out a branch of a repository. I already tried a script to delete everything and commit, but that seemed like it was having some problems. 
