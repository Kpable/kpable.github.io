---
layout: post
title: Smart Scrolling - Efficient UI for an Infinite Inventory
description: 
date: 2023-07-07 15:01:35 +0300
image: '/images/techtonica/techtonica-inventory.png'
tags: [UI]
tags_color: '#3eb99a'
featured: false
---

In our game, the player’s inventory was designed to scale with no hard item limit **a potentially infinite list of items**. This design offered flexibility, but it introduced some unique challenges for performance and UX when implementing the **inventory menu UI** in Unity.

## The Problem

Whenever the player opened the inventory menu, Unity attempted to **redraw every single inventory slot** even if hundreds of items were present. This caused performance hitches, especially since the inventory could **change while the menu was closed**, such as when items were collected from automated machines.

In short:

- **Rendering all items was expensive**
- **Redrawing was frequent**, even for small updates
- **Inventory could update in the background**    

## The Solution: Row Recycling

Instead of drawing every inventory row, I implemented a **recyclable slot system** that behaved like a UI buffer.

### How It Worked

- **Only a limited number of row UI elements** (enough to cover the visible viewport + padding) were instantiated.
- As the player **scrolled**, rows were **recycled** moving the top row to the bottom (when scrolling down) or the bottom row to the top (when scrolling up).
- Each recycled row was **rebound to new item data** based on the current scroll offset in the inventory list.
- This created the **illusion of an infinite scrolling inventory**, while maintaining a minimal, consistent UI footprint.
    

### Benefits

- **Massive performance gains**, especially for late-game inventories
- Smooth, native-feeling scroll behavior
- Flexible for future enhancements like filtering, sorting, or grouping
- Allowed inventory to **continue growing indefinitely** without UI degradation
    

## Technical Highlights

- Implemented custom row pooling and recycling system in Unity UI
- Integrated with existing inventory data model and item sorting logic
- Supported both **gamepad** and **mouse+keyboard** input
- Optimized redraw logic so only **rows with updated content** are refreshed
- Maintained compatibility with the game's existing **menu navigation system**
    

## Why It Matters

This solution is a great example of **gameplay-aware UI engineering**: designing an interface that adapts to real-time game changes while remaining performant, responsive, and scalable. It was also a good opportunity to think like a **technical designer**, balancing what the player sees and feels with what’s happening under the hood.