---
title: Minecraft
eleventyNavigation:
    key: minecraft
    parent: home
layout: layouts/base.njk
---

{% block content %}

<div class="row justify-content-center">
    <div class="generic-col">

# My Minecraft Server

I have a Minecraft server which is using a modified version of [ATM9 no frills](https://www.curseforge.com/minecraft/modpacks/all-the-mods-9-no-frills). You can check the status of the server [here](https://mcsrvstat.us/server/playmc.joshbedwell.com). To play you will need to give me your username so I can add you to the whitelist. Here are the steps to join the server:

## 1. Download Java

You will want to download Java 17 from [here](https://adoptium.net/temurin/releases/?package=jre&version=17). You will need to choose the correct one for your operating system. 

## 2. Download the Prism launcher

Download the Prism Minecraft launcher from [here](https://prismlauncher.org/download/). When you run the launcher you will need to sign into your Minecraft (Microsoft) account. 

## 3. Download the modpack

On the prism launcher click `Add Instance` in the top left, then `Import`. Type the following address into the box labeled `Local file or link to a direct download:` [http://server.joshbedwell.com/atm9server.zip](http://server.joshbedwell.com/atm9server.zip), then hit `OK`. Downloading and extracting the pack might take a few minutes. 

## 4. Select the right Java version

Select the new instance, then hit `Edit`. Open the `Settings` tab on the left, and in the `Java installation` section click `Auto-detect...`. The Adoptium Temurin 17 Java you installed earlier should appear on that list - select it.

This tab is also where you would change the amount of RAM allocated to your instance. By default it is set to 4-8GB. **IF YOU ONLY HAVE 8GB RAM IN YOUR COMPUTER, CHANGE THIS TO 4-6GB BY EDITING THE** `Maximum memory allocation` **BOX TO** `8192 MiB`.

## 5. Launch the game

At this point you should be able to launch the game, with the server address (playmc.joshbedwell.com) included in the instance. There should be two server entries - one of them saying `(Backup)`. If you are on my local network you should be able to use the non-backup one, which technically might be faster. You should be consistent with whichever one you choose, because your map data and so on will count them as different servers. 

## 6. Change settings

There are some visual settings that you might want to change depending on your preference. 

1. You can disable the texture pack by going to the pause menu, `Options` -> `Resource Packs...` and moving the following resource packs out of `Selected`:
- NoBushyLeaves
- Stay True Compats
- Stay True

2. You can disable shaders by going to `Options` -> `Video Settings...` -> `Shader Packs...` and then clicking `Shaders: Enabled`.

    </div>
</div>

{% endblock %}
