---
tags: ["eleventy", "GitHub Actions", "GitHub Pages"]
title: GitHub Pages + Actions Deployment
date: 2024-02-06
excerpt: I just wanted to come out and explain in simple terms how to deploy a GitHub Pages site using whatever static site generator you want. I am using Eleventy for this website (and this example). The complete GitHub Actions script can be found here. I'll go through the script step by step here.
---

I just wanted to come out and explain in simple terms how to deploy a GitHub Pages site using whatever static site generator you want. This post assumes you already have a GitHub Pages repository and a static site generator such as Eleventy, Next.js, Astro, etc. I am using [Eleventy](https://11ty.dev) for this website (and this example). The complete GitHub Actions script can be found [here](https://github.com/rcxwhiz/rcxwhiz.github.io/blob/main/.github/workflows/main.yml). I'll go through the script step by step here.

## Configuring your repository

GitHub pages settings for a repository can be found in `Settings` -> `Pages`. There will be a `Build and deployment` -> `source` dropdown. Choose `GitHub Actions` so that we can write our own script to deploy the website (it will be simple don't worry).

## Triggering and running the script

```
name: Build and Deploy

on:
  push:
    branches: [ main ]
```
If you've never used GitHub Actions before, this means that this script will be triggered whenever there is a commit pushed to the `main` branch, which includes things like pull requests being merged. It makes sense that we only want the site to be redeployed when there are pushes to `main`, because that is essentially our release or deploy branch.

```
jobs:
  build:
    ...

  deploy:
    needs: build
    ...
```
This means that there are two jobs within this "workflow", and the second one needs the first to finish before it can start. They will run in parallel if you don't specify this.

```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
```
This means that our `build` job is going to run on Ubuntu, and it is going to check out our code to do something with it.

## Building the site

```
- name: Build Eleventy
  uses: TartanLlama/actions-eleventy@v1.3
  with:
    install_dependencies: true
```
In this step I am using somebody else's Action to build my Eleventy site. I certainly don't have to do this since it's pretty simple to do this manually. I could have written:

```
- name: Setup Node.js
  uses: actions/setup-node@v4

- name: Install dependencies
  run: npm ci

- name: Build site with Eleventy
  run: npx @11ty/eleventy
```

If you are using a different static site generator (Next.js, Jekyll, Astro, etc.) you can either find an action that will build your site or just throw in the `run` commands necessary to build your site. By default the built files of my Eleventy site will be put into `_site/`. I set `install_dependencies` to `true` because my project uses `bootstrap`, `sass` and `luxon` to build my website. 

## Uploading an artifact

Now that our `build` job has built the site, it's time to upload the files for our site into a GitHub artifact. Artifacts are the way to pass files between jobs. We can easily do this with:

```
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: _site/
```

**If your website files are written to a different directory than `_site/`, you will need to change that parameter.**

You should be able to see and download the artifact produced by this workflow if you click on the action in GitHub after it has finished running. 

## Deploying the site

Now all we need to do is tell GitHub to use that artifact as the files for our site. We can easily do this in the deploy job with:

```
jobs:
  deploy:
    needs: build
    runs-on: ubuntu-latest

    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: {% raw %}${{ steps.deployment.outputs.page_url }}{% endraw %}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

There are several parameters for the `deploy-pages` action, but if you used the `upload-pages-artifact` action in your build job like we did above, you can basically just paste this into the `deploy` job.

## Conclusion

And that's that! Now you know how to write a GitHub Actions script to deploy your GitHub Pages static site. 
