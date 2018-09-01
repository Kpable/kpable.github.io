---
title: This Portfolio Website
subtitle: 
layout: project
description: |
  This website. Created with Jekyll and Github Pages.
# icon: homepage-screenshot.png
tags: [web development, jekyll, ruby, markdown]
published: true
links:
- label: "Source"
  url: https://github.com/Kpable/kpable.github.io
  icon: "fa-github"
- label: "Project"
  url: https://kpable.github.io
  icon: "fa-gamepad"
- label: "Developer Site"
  url: 
  icon: "fa-globe"
---

<!-- Description -->
{{ page.description }}

---

## What I did


![Image] [image]{:class="image fit"}

<!--excerpt_end-->

## How this project came to be


---


<!-- [image]: {{ site.url }}/assets/images/project-category/image.png -->
[image]: {{ site.url }}/games/{{ page.title | slugify }}/{{ page.image_dir }}feature.png