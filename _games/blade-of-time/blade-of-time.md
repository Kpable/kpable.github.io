---
title: Blade of Time
subtitle: (Kenney Jam)
layout: project
description: |
  Game Jam Submission with the Theme of "Time Travel". Top Down 2D rougelite in which you weild a sword that has the power to rewind time retaining all experience it gathers.
tags: project
source-link: 
project-link: 
developer-link: 
published: true
screenshots:
  - tilemap-to-node-graph.gif
  - astar.gif
  - continuous-pathfinding.gif
source-link:  https://github.com/Kpable/Blade-of-Time
project-link: https://kpable.itch.io/blade-of-time

---

<!-- Description -->
{{ page.description }}

---

## What I did

Inadvertantly spent too much time implementing a Unity Tilemap to a node graph that can be passed to a path finding algorithm AND implementing that path finding algorithm. I implement A* pathfinding. 

I also took breaks from that to implement some menu navigation and UI functionality. 


![Image] [image]{:class="image fit"}

<!--excerpt_end-->

## How this project came to be

I found out about the Itch.io [Kenney Jam](https://itch.io/jam/kenney-jam-2018) and asked a friend if he wanted to join it with me. The theme was revealed to "Time Travel" and we quickly came up with the idea of a small rogue lite in which the roguelike mechanic of growing through death was translated to the player running out of time to stop the final boss and the sword unleashing its power to rewind time back 5 minutes. 

---


[image]: games/{{ page.title | slugify }}/{{ page.image_dir }}feature.png