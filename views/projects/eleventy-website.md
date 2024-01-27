---
tags: ["eleventy", "Node", "GitHub Actions", "GitHub Pages"]
title: Eleventy Website
date: 2024-01-25
updated: 2024-01-26
repo: https://github.com/rcxwhiz/rcxwhiz.github.io
demo: https://joshbedwell.com
---

This is what I'm using to write/host this website! What an appropriate first project. 

# Motivation

I already had a great personal/showcase website. The only issue with it was that it was a hassle. I had made it, or learned how to make this style of website, when I was in my early days and I thought it was so cool that I could manually do so many things. I had been using django for a while, because django is cool, but then I realized that it is superflous to the purposes of a static, personal showcase website. So then I wrote my own Node.js scripts to compile some nunjucks templates and so on into a static site. If I want to change something on my website I need to:

1. Write and test the changes on my own branch, which wasn't really seamless since I was manually compiling the site and serving the files
2. Commit those changes to my repository
3. Log into my DigitalOcean Droplet
4. Pull the changes from GitHub
5. Run the static site generator on the server
6. Restart NGINX to make sure it doesn't missbehave
7. Check and make sure everything worked

Eventually I got tired of this cumberson process, so I set out to: 

1. Use a real static site generator
2. Get some sort of GitHub actions or some integration to automatically deploy the site

And hopefully, we can dramatically streamline this process.

# Stack

I ran into [eleventy](https://11ty.dev) pretty quickly, and was allured by the promise that it's new, trendy and minimal. I looked around at alternative projects, like Astro and Next.js, but I found that they weren't quite hitting the level of functionality I needed. Eleventy got the vibe just right.

I got an eleventy node project setup, and from what I saw you can do a lot of configuration through the `.eleventy.js` file. I don't know if I'm abusing that, but that's were all my configuration is, which is nice. 

I got the hang of the nunjucks & markdown templating pretty quick. It's easy to build the site (`npx @11ty/eleventy`) and it's easy to setup a file watcher + local server (`npx @11ty/eleventy --serve`).

# Deployment

Now the question was how to get CI for deploying this website. I am tired of manually propagating website changes. 

I am familiar with CI/CD through GitHub actions, and the repository was already hosting on GitHub, so I decided to look into GitHub pages since I figured that would be easy to deploy to. After looking into it, I saw that github pages has 1st party support for jekyl, which I was not interested in using. I wanted to get something with eleventy to work.

The script I made ended up being rather simple. It just checks out the code, runs the compile command, and then copies the contents of the output directory into a branch of the repository, and the GH pages was configured to automatically serve out of this branch. All good? Yes! Everything is working with that, and now changes to main are automaticaclly propagated to the website.

I did do the work to configure my domain name for the website rather than the default ([rcxwhiz.github.io](), which now redirects to [joshbedwell.com]()).

# Takeaways

I am really happy to have made such a simple and robust setup for myself. In development, all you have to do to see the site in real time is `npx @11ty/eleventy --serve`, and all you have to do to deploy the site is let the simple GitHub actions script do all the work for you. 

I still haven't figured out all the tags stuff and the templating features, but I'm looking forward to using all of that. Eleventy seems to really nail the depth of features vs. simplicity I need. 
