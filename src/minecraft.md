---
title: Minecraft
eleventyNavigation:
    key: minecraft
    parent: home
layout: layouts/base.njk
---

{% block content %}

# My Modded Minecraft Server

<p class="lead">
    I have a Minecraft server which is using a tweaked version of ATM9 no frills. You can check the status of the server <a href="ttps://mcsrvstat.us/server/playmc.joshbedwell.com">here</a>. To play you will need to give me your username so I can add you to the whitelist. Here are the steps to join the server:
</p>

## 1. Download Java

You will want to download Java 17 from [here](https://adoptium.net/temurin/releases/?package=jre&version=17). You will need to choose the correct one for your operating system. 

## 2. Download the Prism launcher

Download the Prism Minecraft launcher from [here](https://prismlauncher.org/download/). When you run the launcher you will need to sign into your Minecraft (Microsoft) account. 

## 3. Download the modpack

On the prism launcher click `Add Instance` in the top left, then `Import`. Type the following address into the box labeled `Local file or link to a direct download`: [http://server.joshbedwell.com/atm9server.zip](http://server.joshbedwell.com/atm9server.zip), then hit `OK`. Downloading and extracting the pack might take a few minutes.

<div class="bd-callout-info bd-callout">
    You don't have to download the .zip file to your computer, you can just copy this link into the Prism popup.
</div>

## 4. Select the right Java version

Select the new instance, then hit `Edit`. Open the `Settings` tab on the left, and in the `Java installation` section click `Auto-detect...`. The Adoptium Temurin 17 Java you installed earlier should appear on that list - select it.

<div class="bd-callout-warning bd-callout">
    If you only have 8 GB of RAM you will want to decrease your allocated RAM on this page. Edit the <code>Maximum memory allocation</code> field to <code>6144 MiB</code>.
</div>

## 5. Launch the game

At this point you should be able to launch the game, with the server address (playmc.joshbedwell.com) included in the instance. There should be two server entries - one of them saying `(Backup)`. If you are on my local network you should be able to use the non-backup one, which technically might be faster. You should be consistent with whichever one you choose, because your map data and so on will count them as different servers. 

## 6. Change settings

There are some visual settings that you might want to change depending on your preference. 

1. You can disable the texture pack by going to the pause menu, `Options` -> `Resource Packs...` and moving the following resource packs out of `Selected`:
- NoBushyLeaves
- Stay True Compats
- Stay True

2. You can disable shaders by going to `Options` -> `Video Settings...` -> `Shader Packs...` and then clicking `Shaders: Enabled`.

{% endblock %}
