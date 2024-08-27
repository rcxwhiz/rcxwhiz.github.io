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
    I have a Minecraft server which is using a custom version of ATM9. You can check the status of the server <a href="ttps://mcsrvstat.us/server/playmc.joshbedwell.com">here</a>. The server uses a whitelist.
</p>

## 1. Download Java

You will want to download Java 17 from [here](https://adoptium.net/temurin/releases/?package=jre&version=17). You will need to choose the correct one for your operating system. 

## 2. Download the Prism launcher

Download the Prism Minecraft launcher from [here](https://prismlauncher.org/download/). When you run the launcher you will need to sign into your Minecraft (Microsoft) account. 

## 3. Download the modpack

On the prism launcher click `Add Instance` in the top left, then `Import`. Type the following address into the box labeled `Local file or link to a direct download`: [http://server.joshbedwell.com/ATM9J.zip](http://server.joshbedwell.com/ATM9J.zip), then hit `OK`. Downloading and extracting the pack might take a few minutes.

<div class="bd-callout-info bd-callout">
    You don't have to download the .zip file to your computer, you can just copy the link into the Prism popup.
</div>

## 4. Select the right Java version

Select the new instance, then hit `Edit`. Open the `Settings` tab on the left, and in the `Java installation` section click `Auto-detect...`. The Adoptium Temurin 17 Java you installed earlier should appear on that list - select it.

<div class="bd-callout-warning bd-callout">
    This modpack requires at least 10GB RAM. You will need to set the RAM limits in the same place where you choose the Java installation. I recommend 8GB (8196MB) minimum and 10-12GB maximum (10240-12288MB).
</div>

## 5. Launch the game

At this point you should be able to launch the game! Add the server **playmc.joshbedwell.com** and you should be good to go.

{% endblock %}
