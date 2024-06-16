---
tags: ["Python", "Django", "Rust", "React"]
title: Reviving My Reddit Clone
date: 2024-03-28
excerpt: I am thinking of reviving my old Reddit clone called Marceline. This would involve actually writing the React frontend this time, and refreshing the Django backend (while trying to stay focused and not rewrite it in Rust).
eleventyNavigation:
    key: revive-marceline
    parent: blog
---

A while ago I wrote the backend for a Reddit clone called Marceline. That code is [here](https://github.com/Marceline-Live/Marceline-API). I originally wrote this Django backend and then lost steam when it came time to make the frontend. I was prompted to make this project when Elon bought Twitter and ruined it as well as when Reddit closed their third-party API and screwed Apollo, and I had the classic thought: "How hard could it really be?"

I was already familiar with Django, so it really wasn't that hard to make the backend. I did learn the Django Rest Framework (DRF) package, so that was interesting. I did also have "fun" (nerd fun) writing decent tests for the API. When I started getting to the finish line I started having the other classic thought: "What is the point of doing this?" At the time I was applying to grad school among other things, so I felt like I couldn't justify spending all the time to finish and polish the project. I had already got my bang for buck as far as learning new stuff, and it was time to call it quits. 

Now I've been thinking it's time to call it not quits. I have learned some cool new GitHub Actions CI/CD stuff from other projects, and just some other tips and tricks to make a project really convenient and production-ready that I want to apply to this project. Then there's the other side - the front end. All these years I have somehow avoided writing a React app. I don't know how, I just have. I have mostly felt fine about that because I am not *super* interested in JavaScript or frontend development, but it's just been nagging at me too long that I've never done it. 

When I was thinking about starting this up again, I thought it could be fun to rewrite the backend in Rust. I know a lot of Python, but my favorite language is Swift. Behind that might be Rust. Anyway, I thought that doing this with type safety (and all the obvious moral victory of rewriting something in Rust) might make it worth it to learn something else. After looking into it, it looks like I would probably use Axum in conjunction with Diesel (along with probably other crates) and it just felt like it might be biting off more than I can chew. My biggest Rust experience has been trying to write a game in Bevy, which was a whole other learning curve for me. It was a really good learning experience, but it did not lead to a functional product. Now that I write it out it sounds even more promising. But I must stay strong. I have to keep telling myself it would be more cool if it actually worked and people could actually use it. 

First I am going to try to clean up the backend repository. I think I will cut off whatever feature I was in the middle of implementing and just try to get it to some working alpha version. I'd also clean up the readme and start using GitHub for issues. Then I would realistically want to start the React frontend. I think it is going to be hard for me to completely pass up doing a Rust backend, just to investigate what that would be like, but I will try to stay focused. 
