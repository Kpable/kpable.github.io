---
layout: post
title: Quest Journal UI – Interactive, Dynamic, and Multiplayer-Synced
description: 
date: 2024-04-23 15:01:35 +0300
image: '/images/techtonica/techtonica-journal-ui-4x3.png'
tags: [UI]
tags_color: '#3eb99a'
featured: false
---

I was responsible for implementing the **Quest Journal UI**, a dynamic menu system that enabled players to **track quest progression and control task visibility** within the game’s HUD. This system needed to be responsive, performant, and multiplayer-aware providing a clean, accessible interface for interacting with evolving quest data in real-time.

---

### From Mockup to Implementation

The design team collaborated with the art team to deliver a UI mockup that conveyed the desired player experience. From that foundation, I translated the vision into a **functional, optimized, and responsive in-game menu**, built with scalability and usability in mind.

The menu featured:
- A **categorized list** of active quests.
- A **detail panel** that expanded on hover (mouse) or selection (controller).
- **Collapsible categories** to reduce on-screen clutter and improve navigation.
- **Task HUD integration**, allowing players to control which objectives are actively displayed during gameplay.

---

### Technical Challenges & Solutions

#### UI Performance & Optimization

Early tests revealed that Unity’s built-in `LayoutGroups` were causing **performance bottlenecks** due to excessive Canvas redraws especially when rendering many quest entries. 

To solve this, I:
- Replaced dynamic layout components with **manual positioning logic**.
- Created **modular, reusable UI prefabs** to minimize redraws and instantiation overhead.
- Implemented **selective updates**, refreshing only UI elements that had actually changed.

This significantly improved menu responsiveness, especially in late-game scenarios with many simultaneous quests.

#### Multiplayer Quest Syncing

As quest progression could be triggered by **any player** in the multiplayer session, the system had to handle **background updates** while still respecting the player’s local UI state.

I ensured that:
- Open menus reflected real-time quest updates, even if triggered remotely.
- UI consistency was maintained without disrupting the player’s current interactions.
- State changes were broadcast and reconciled cleanly across clients.

---

### Shared UI Functionality

In addition to the Journal-specific features, I also contributed to broader UI systems that spanned across multiple menus:

- **Multi-input support**: Seamless navigation via mouse or gamepad.
- **Input device detection**: Swapped input schemes on-the-fly.
- **Dynamic prompt updates**: Adjusted visible button prompts to reflect the current input device.
- **Object pooling**: Recycled inactive UI elements to reduce allocation and improve performance.
- **Carousel menu integration**: Ensured the Journal worked smoothly as a sibling to other major game menus.

---

### Takeaways

This system reflects my ability to:
- **Own and deliver feature-complete UI systems** from design to implementation.
- **Collaborate cross-discipline**, respecting artistic and UX goals while solving technical constraints.
- **Think in systems**, planning for performance, multiplayer interaction, and long-term scalability.
- Balance technical decisions with player experience resulting in a clean, responsive interface that keeps pace with the rest of the game.

