---
layout: post
title: From Spoken Word to UI - Implementing a Dialogue Playback Log
description: 
date: 2023-05-03 15:01:35 +0300
image: '/images/techtonica/techtonica-log-ui-4x3.png'
tags: [UI]
tags_color: '#3eb99a'
featured: false
---

The **Log Menu** was designed to give players access to a full transcript of previously played narrative dialogue, including the ability to **replay voiced lines**. In a factory automation game where gameplay events can trigger narrative dialogue in the background, this menu helps ensure that **important narrative beats or gameplay hints** aren't missed due to timing or system interruptions.

I was responsible for implementing this menu after a well-integrated dialogue system was already in place, which displayed spoken text in real-time through HUD elements. My work touched multiple systems, including dialogue management, quest progression, localization, save data, and UI.

---

### Handling Dialogue Tracking Gaps

One core issue I identified early in implementation was that **narrative dialogue playback wasn't being persistently tracked**. While quests triggered dialogue, the actual progression of chained dialogue entries wasn't stored. This could result in players **missing key context** if they saved and exited or if the game crashed mid-dialogue.

To solve this:

- I **added a list of completed dialogue entry IDs to the save system**, capturing exactly which lines had finished playback.
- On game load, I introduced a **startup check** that detects incomplete dialogue chains and restarts them from the beginning, ensuring the player still receives the full context.
    
This fix also became foundational for **later progression tracking features** that relied on specific narrative moments.

---

### UI Implementation

Translating spoken dialogue into a clear, readable transcript posed several unique challenges and opportunities. My responsibilities included:

- **Transforming dialogue entry data** into a format suitable for transcript display, including timestamping entries with estimated playback times.
- **Color-coding entries** by speaker, exposing these mappings in the inspector for designer control over aesthetics and clarity.
- **Reconstructing chained dialogue** as a cohesive block of text that reads naturally while clearly communicating who said what and when.

---

### Shared Menu Functionality

As part of our broader UI systems, the Log Menu shared many functional components with other in-game menus I worked on:

- **Input-agnostic controls**, supporting both mouse and gamepad navigation.
- **Input prompt updates** based on the active input device.
- **Manual positioning of UI elements** to avoid layout system bottlenecks identified during performance profiling.
- **Object pooling of reusable UI elements**, reducing overhead when handling a large number of transcript entries and maintaining performance in mid-to-late game sessions.
- **Carousel menu integration**, allowing the Log Menu to work seamlessly as part of the game's larger menu navigation flow.
    
---

### Summary

The Log Menu UI was a deeply cross-functional system that addressed **both technical and experiential gaps** in the narrative system. From enhancing data persistence to implementing dynamic, scalable UI, it showcases my ability to:

- **Identify and resolve systemic design issues**.
- **Implement performant, user-friendly interfaces**.
- **Collaborate across design, audio, and content pipelines**.
- Build with **extensibility** and **designer usability** in mind.