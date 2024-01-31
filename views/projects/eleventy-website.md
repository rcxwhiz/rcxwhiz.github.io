---
tags: ["eleventy", "Node", "GitHub Actions", "GitHub Pages"]
title: Eleventy Website
date: 2024-01-25
updated: 2024-01-30
repo: https://github.com/rcxwhiz/rcxwhiz.github.io
excerpt: This is what I'm using to write/host this website! What an appropriate first project to write about. I used eleventy & GitHub pages to replace my manual static site generation + Nginx.
---

This is what I'm using to write/host this website! What an appropriate first project to write about.

## Motivation

I already had a decent personal/showcase website, the only issue was that it was a hassle to maintain. When I learned how to write & host my own custom websites I started using Django & Nginx, which was fun at the time, but it became a hassle to propagate changes to the site. I moved on from Django, but I was still using a custom static site generator with Node.js and nunjucks. If I wanted to change something on my website I had to:

1. Write and test the changes on my own branch, which wasn't really seamless since I was manually compiling the site and serving the files, and I had weird environment variables
2. Commit those changes to my repository
3. SSH into my DigitalOcean Droplet
4. Pull the changes from GitHub
5. Run the static site generator again on the server
6. Restart NGINX to make sure it doesn't misbehave
7. Check and make sure everything worked (it did not always work)

Eventually I got tired of this cumberson process, so I set out to: 

1. Use a real static site generator
2. Get some sort of GitHub actions or other CI/CD to automatically deploy the site
3. Overall streamline the process

## Stack

I ran into [eleventy](https://11ty.dev) pretty quickly, and was allured by the promise that it's new, trendy and minimal. I looked around at alternative projects, like Astro and Next.js, but I decided they might both by a little overkill for what I needed. Eleventy got the vibe just right.

I got an eleventy node project setup, and from what I saw you do a lot of configuration through the `.eleventy.js` file. I don't know if I'm abusing that, but that's were all my configuration is, which is nice. 

I got the hang of the nunjucks & markdown templating pretty quick. It's easy to build the site (`/npx @11ty/eleventy`) and it's easy to setup a file watcher + local server (`/npx @11ty/eleventy --serve`).

I went with Bootstrap as usual for my css framework. Eleventy didn't support scss by default, but they had an easy guide for how to configure it, so that was a nice balance of you get exactly what you need.

## Deployment

Now the question was how to get CI for deploying this website. I am tired of manually propagating website changes across a couple steps. 

I am familiar with GitHub actions, and the repository was already hosted on GitHub, so I decided to look into GitHub pages since I figured that would be easy to deploy to. After looking into it, I saw that github pages has 1st party support for jekyll, which I was not interested in using since I had come this far with eleventy and liked it, but I am aware that jekyll is a popular alterative that does roughly the same thing.

The script I made ended up being rather simple. It just checks out the code, runs the compile command, and then copies the contents of the output directory into a branch of the repository, and the GH pages was configured to automatically serve out of that branch. All good? Yes! Everything is working, and now changes to main are automaticaclly propagated to the website.

I did the work to configure my domain name for the website rather than the default ([rcxwhiz.github.io](), which now redirects to [joshbedwell.com]()).

## Data Driven Page Generation

Something that I **love** is the ability to put `.json` files in `views/_data/` and just have all that stuff available in your nunjucks templates. I was able to really minimize the templates I wrote for my resume and just have a big json file that's really easy to edit. It's also so nice that when you're developing you can edit the json in real time and just watch it popping up on the website. In reality a giant json file also becomes unweildy at some point, but it is really nice to completely separate the data from the page styling. It makes me feel like if I spent more time on this I could get this static site extremely data driven, which would be kind of cool for if I was going to make this project super easy to follow along and use for a custom site, but I'd consider that a separate project from just putting up my own static site. I could see that becoming a rabbit hole with making it more generalizable. But I really wish there was some service for making a CLEAN website like this with sort of drag and drop elements. Every site builder service I see makes these cheesy overly styled sites that are full of stock images or contain lots of product pages that border on a web store.

It was nice to be able to make templates that work anywhere for things like breadcrumbs and next/previous page buttons, and all that is possible through the built in eleventy data. It makes it a lot easier even just in a relatively small personal site to be able to `{% raw %}{% include 'layouts/breadcrumbs.njk' %}{% endraw %}` somewhere in your file, totally agnostic of the page. I have basically the same thing going on for the page number navigation. 

The whole "cascading data" element of eleventy is what makes it so convienient to me. The ability to define little nunjucks variables in the header of templates is just the beginning of what you can do but still so nice.

## Takeaways

I am really happy to have made such a simple and robust setup for myself. In development, all you have to do to see the site in real time is `npx @11ty/eleventy --serve`, and all you have to do to deploy the site is let the simple GitHub actions script do all the work for you. 
