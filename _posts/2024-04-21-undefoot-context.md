---
layout: post
title: Context-Aware Footstep Audio via Underfoot Surface Detection
description: 
date: 2024-04-21 15:01:35 +0300
image: '/images/techtonica/techtonica-underfoot-context.png'
tags: [Gameplay]
tags_color: '#f14979'
featured: true
---

In first-person games, small touches like the **sound of footsteps** can have a major impact on immersion. The challenge: our world was composed of a wide range of surface types **voxel terrain, water, props, facility floors, designer-placed narrative elements** and players could move freely between them at any time.

I implemented a system to **dynamically and efficiently detect what the player is standing on**, enabling the game to **play accurate, performant footstep audio** that matched the surface context.

## The Problem

- The game featured **many surface types** terrain, machines, props, water, sand, etc. each requiring different sound cues.    
- Players were **constantly walking, running, jumping**, and **building structures**, changing the environment beneath them at runtime.
- **Checking surface type every frame** was expensive due to the variety of components and systems involved.
- Needed a solution that would **scale well** in a game with dynamic terrain and extensive player-built elements.

## The Solution: Cached Context-Aware Audio Detection

I built a system that **leveraged existing player-ground detection**, added **layered surface resolution**, and introduced **smart caching** to avoid unnecessary processing.

### Leveraging Existing Raycasts

The player controller already used a **downward raycast** from the center of the player's body to detect slopes and maintain proper ground positioning.  
I **repurposed this raycast** to identify the object or terrain underfoot when grounded no extra casts needed.

### Multi-System Surface Resolution

When grounded and needing to play a footstep sound:
  - **Checked for cached context** of the object instance hit by the ray.
  - If not cached, resolved the surface through a series of fallbacks:
    - **Voxel terrain** → Read terrain material data.
    - **Water voxels** → Read from baked data during level design.
    - **Designer-defined objects** → Retrieved assigned surface metadata.
    - **Sand surfaces or props** → Identified via scene data.
    - **Machines** → Pulled from the factory simulation.

This allowed the system to resolve **the correct audio context** even across vastly different systems and world object types.

### Efficient Caching System

To prevent expensive lookups:

- Maintained a **cache of ~50 unique object instances** with:
    - Surface context (sound type)
    - Last accessed timestamp
- Oldest entries were reset and reused when the cache reached capacity.
- Frequently stepped-on surfaces (like factory floors or terrain clusters) stayed cached and required **no additional computation**.

### Design-Informed Optimization

Through observation and playtesting:

- Found that players tended to **build large contiguous surfaces** (e.g., factory platforms).
- Terrain areas and biomes also had **natural clustering of surface types**.
- This informed cache size and eviction strategy keeping it small but effective.

## The Result

- **Accurate audio feedback** for footstep events across all world surfaces.    
- **Seamless integration** with existing player controller and world systems.
- **Major performance gain**: significantly fewer GetComponent calls and system lookups.
- Improved the **overall polish** of the player experience in a dynamically changing world.

## Why It Matters

This work bridged the gap between **audio feedback, world systems, and gameplay feel** combining **performance-conscious engineering** with attention to immersion and detail.  
It’s a good example of how **technical design** can turn a subtle system into something players _feel_ without ever noticing and how leveraging existing data can solve complex runtime challenges elegantly.