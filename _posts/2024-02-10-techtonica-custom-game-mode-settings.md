---
layout: post
title: Techtonica - Custom Game Mode Settings
description: Implementing 100+ custom game mode settings to customize game play. 
date: 2024-02-10 15:01:35 +0300
image: '/images/techtonica/techtonica-journal-ui-4x3.png'
tags: [Gameplay]
tags_color: '#f14979'
featured: false
---

So I worked on a Settings menu. While I occasionally adjusted the UI in a few of its passes I largely worked on the underlying logic for setting's state tracking, application, and display. 

Most games come with various settings to configure and customize the gameplay for individual player hardware and preferences with a menu enabling all of it. 

There are many aspects to getting any kind of menu up and running but a settings menu in particular has some extra considerations. For example, a settings menu needs to: 

- Provide the player with a way to toggle, set, or select a setting configuration. 
- Enable the developers to define an appropriate default configuration.
- Optionally auto detect an appropriate default configuration (such as resolution based on the screens capabilities, or game language based on system setting).
- Save and Load the setting's configuration based on either default or player set value. 
- Be able to scale to have additional settings as development continues. 
- Optionally (platform dependent), support multiple forms of input such as mouse and gamepad. 
- Optionally (platform dependent), be hidden if the setting does not apply to a particular platform.
- Work. As in all the settings need to be applied to the game session either on game launch or while the game is in progress. 


It's a pretty fun challenge to tackle. I jumped into the system after its prototype state was implemented tasked with bringing into a more production ready state that would be extended in the future. So i got to work. 

I broke down the state of the settings system and identified that each setting defined at the time can be configured as a toggle, slider, or dropdown. So I created some base prefabs that fit the bill for each of those types set up in such a way where their content, (name, value, state), would be set at runtime.  
