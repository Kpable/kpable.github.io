---
title: MCLSCal
subtitle: (Roc Hack Hackathon)
layout: project
description: |
  Web Application that allows Rochesterians to select a subset of libraries closest to them in the Monroe County Library System and generate an ical that can be subscribed to. The events the libraries have posted are added to the user's personal calendars.
tags: [web development, ruby on rails, hackathon]
published: true
screenshots:
links:
- label: "Source"
  url: https://github.com/585-software/mclscal 
  icon: "fa-github"
- label: "Project"
  url: https://mclscal.herokuapp.com/
  icon: "fa-gamepad"
- label: "Developer Site"
  url: https://devpost.com/software/mclscal
  icon: "fa-globe"
---

<!-- Description -->
{{ page.description }}

---

## What I Did

Learned how to generate a ruby on rails web application, created some services that would perform specific functions, and tests that would test those services. 

Specific services include the generation of the request that would be made to retrieve event data from the Monroe County Library System and integration of an Icalendar library that would take the user selected libraries and generate a custom ICal link that can subscribed to. 


![Image] [image]{:class="image fit"}

<!--excerpt_end-->

## How this project came to be

Spur of the moment decision to participate in the [Roc Dev Civic Hackathon] in which over the course of four weeks my team and I would utilize freely availble data sets to build an app that would impact and help the community. 


---


[image]: games/{{ page.title | slugify }}/{{ page.image_dir }}feature.png

[Roc Dev Civic Hackathon]: https://roc-hacks.devpost.com/