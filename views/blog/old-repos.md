---
tags: []
title: Old GitHub Highlights
date: 2024-02-10
excerpt: I've been needing to clean out some old repos on my GitHub account. I have done a clean out once before, but that was a while ago and now I'm up to 55 repos, so I thought I would do a highlight reel of some of the odd / hyper specific ones.
---

I've been needing to clean out some old repos on my [GitHub account](https://github.com/rcxwhiz/). I have done a clean out once before, but that was a while ago and now I'm up to 55 repos, so I thought I would do a highlight reel of some of the odd / hyper specific ones. Some of the links to these repos might break since a lot of them just need to be cleaned out.

#### [pbprefs-rs](https://github.com/rcxwhiz/pbprefs-rs) - Feb 2024

This is actually a library I'm wanting to start working on. The idea is a library for managing persistent configuration in a way that can be programatically adjusted at runtime or by a user via .toml file. Naturally since I am just about to start it, it seems like a great idea. "pb" might be an adventure time reference...

#### [mc-benchmarking](https://github.com/rcxwhiz/mc-benchmarking) - Dec 2023

This is a fork of someone else's repository that has Python scripts for semi-automated modded Minecraft performance testing. This was meant for testing different JVMs / arguments to see which give the best performance in modded Minecraft. No hate to the original author of this repo, but the scripts were not written very... robustly, and they were in disrepair. After spending a few hours trying to fix them, I did the math and realized it would probably save me time to just run the tests manually. 

#### [ModCraft](https://github.com/rcxwhiz/ModCraft) - Dec 2023

This is the repository for the open source, performance and modding focused sandbox voxel game I was writing in Rust / Bevy. It was a big thing for me to bite on since I hadn't done any real game programming before this, but it was coming along. Eventually I ran into the road bump that the Bevy engine basically works better when everything is known at compile time, but I wanted my mods to work as dynamically loaded libraries. It sounds like the features I need might be added in Bevy 0.13, so maybe I'll try again then, but it sounds like I might still be swimming upstream on that one.

#### [RealMouse](https://github.com/rcxwhiz/RealMouse) - Apr 2022

This was a fun one. I was periodically docking my MacBook, which meant I was using an external mouse half of the time, and I discovered the genius Mac setting where scroll direction between the mousewheel and trackpad are inexplicably linked (but of course not in a way that I found intuitive). There is also the issue that forward / back buttons on external mice don't do anything by default on Mac (M4 & M5). There's also some pointer acceleration oddities. I wrote this Mac program in SwiftUI that would compensate for all of these things, and it actually worked pretty well given it was my first stab at this type of program! Eventually I discovered [LinearMouse](https://linearmouse.app) which does all this stuff for free, so I started using that.

#### [birdevolution](https://github.com/rcxwhiz/birdevolution) - Mar 2022

This was a really cool evolutionary genetic neural network game tutorial I was following. I didn't end up following through with the whole series and getting the whole game working, but it was cool and it was pretty much my first Rust project.

#### [Tuner](https://github.com/rcxwhiz/Tuner) - Dec 2021

This was the latest iteration of my Apple Music client I was writing in SwiftUI. I became especially frustrated with the built in Apple Music app and especially interested in writing an iOS app, so this was my project I was working on from scratch. I didn't have any experience with Swift or SwiftUI, but Swift went on to become my favorite language. These days I'm not quite sure which one it is between Swift or Rust. I decided I don't think I'm going to ever finish that app due to the amount of work that it would take to put out something comperable to Apple or other 3rd parties, but it was a cool project and learning the declarative SwiftUI framework really opened my eyes to a lot of software design principals. 

#### [sudokupp](https://github.com/rcxwhiz/sudokupp) - Nov 2021

I'm pretty sure this is from when I got COVID 19 for the first time, and I was bored inside so I started doing sudoku puzzles, but they were really boring to me and I felt like it would be way more fun to write a program that can solve them really quickly. I'm pretty sure as I left it it could solve most puzzles really quickly, but there were one or two strategies in sudoku I didn't come up with intuitively that I never implemented which are required for solving some really hard puzzles. It was really satisfying to plug in the puzzles and watch them get solved in a fraction of a second.

#### [byu-lookup](https://github.com/rcxwhiz/byu-lookup) - Jun 2021

While I was doing some web scraping project on my university's course registration system, I incidentally discovered some APIs that were leaking a lot of personal information about university faculty. It was probably enough to guess their password recovery questions or social engineer a way into their accounts, so in this repository I made a demo of the vulnerability that would print out everyone's information and then I sent it in to the campus IT building (where I had perviously worked). They eventually patched it and thanked me for pointing it out.

#### [fball](https://github.com/rcxwhiz/fball) - Feb 2021

This was one of the most fun things I've ever made. I made a little Django website where you could sign up and give yourself a nickname, and then record the results of foosball games against other people in the system. It would then rank all players based on a "power ranking" algorithm I made, and it was actually really fun. We had a foosball table in our apartment, and people would come over to improve their rankings. Periodically I would hit a button that would start a new "season", and essentially clear the rankings. It was a great time all around. It was the first web app I had ever made and my first real project with Django. I didn't do a full login system or anything for the users, but I did at least make it so that you could only submit game results and things from my apartment WiFi. 

#### [reylo](https://github.com/rcxwhiz/reylo) - Jan 2021

This was the last iteration I had of a semi-automated scripting system for grading Python assignments. I worked as a teaching assistant in a Python for engineers course for a few years, and I went back and forth on ways to try to speed up grading the assignments. The problem was that they did a lot of assignments that involved making graphs and so on, so you can't just diff the output of the program.

#### [CatanBoard](https://github.com/rcxwhiz/CatanBoard) - May 2020

Another COVID related project. When lockdown first happened, I came home from university, and we played a lot of Catan. I was targeted in these games, unfairly of course, and I had to make sure the games were 100% fair. I decided to create this board generator that would randomly create fair boards. I don't remember to what degree I got it working, but it was weird to try to represent the hexagonal nature of the Catan tiles. I think in the end I started using another website that could do this.

Past that I think I had cleaned out everything I didn't need anymore. Thanks for taking the trip down memory lane with me. I think it can be fun to look back at all the random little projects you or others started / finished.
