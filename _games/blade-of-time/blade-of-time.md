---
title: Blade of Time
subtitle: (Kenney Jam)
layout: project
description: |
  Kenney Game Jam submission with the theme of "Time Travel". Top Down 2D rouge-lite in which the rogue-like mechanic of growing through death was translated to the player running out of time to stop the final boss and the sword unleashing its power to rewind time back 5 minutes, retaining all experience it gathers.
tags: [game jam, team]
screenshots:
  - tilemap-to-node-graph.gif
  - astar.gif
  - continuous-pathfinding.gif
links:
- label: "Source"
  url: https://github.com/Kpable/Blade-of-Time
  icon: "fa-github"
- label: "Play"
  url: https://kpable.itch.io/blade-of-time
  icon: "fa-gamepad"
- label: "Developer Site"
  url: 
  icon: "fa-globe"
---

<!-- Description -->
{{ page.description }}

---

## What I Did

I found out about the Itch.io [Kenney Jam](https://itch.io/jam/kenney-jam-2018) and asked a friend if he wanted to join it with me. With a team of 2 and a couple days, I inadvertently spent too much time implementing a Unity Tilemap to a node graph converter that can be pass a graph to a path finding algorithm. As well as implementing that path finding algorithm. I implemented A* path finding which is something on my list of game development curiosities. I also took breaks from that to implement some menu navigation and UI functionality. 


<!-- ![Image] [image]{:class="image fit"} -->



[image]: {{ site.url }}/games/{{ page.title | slugify }}/{{ page.image_dir }}feature.png