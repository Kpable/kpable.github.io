---
layout: post
title: Seamless Auto-Crouch System for Traversing Voxel Terrain in Unity
description: 
date: 2022-08-17 15:01:35 +0300
image: '/images/techtonica/techtonica-auto-crouch-narrow-space.png'
tags: [Gameplay]
tags_color: '#f14979'
featured: false
---

In a game built on a voxel-based terrain system with **rounded terrain edges**, we wanted player traversal to feel fluid and intuitive. However, players often found themselves **getting stuck under terrain curves** that _looked_ like they should be passable especially when those curves weren’t visible from the camera’s eye level.

I implemented a **seamless auto-crouching system** to resolve this issue, making movement across the terrain feel natural and responsive without forcing players to manually crouch and uncrouch.

## The Problem

- Voxel terrain had **organic, curved geometry** that invited exploration but could still trap players under subtle overhangs. 
- Some overhangs weren’t clearly visible, making collisions feel unfair.    
- Players expected to **slip under curves or structures** they visually _should_ fit beneath, but the default capsule collision blocked them.    
- Manual crouching didn’t solve the core issue of unpredictability during fast traversal.    

## The Solution: Predictive, Seamless Auto-Crouch

I designed and implemented an **automatic crouch system** that dynamically adjusted the player’s collider and camera height based on the terrain around and ahead of them.

### Key Features
- **Predictive Movement Checking** used the player's **input and horizontal velocity** to calculate their predicted next-frame position for accurate collision checks.
- **Sphere Casting for Ceiling Detection** from the base of the capsule collider (representing the player’s feet), I cast a **SphereCast** upward to simulate the **rounded top** of the player's capsule and detect any overhanging geometry.
- **Dynamic Height Adjustment** on detecting a collision by calculating the **distance to the ceiling** and adjusting the **player’s collider height** and **camera height** proportionally to simulate a crouch.
- **Ground-Proximity Safety Checks** if the lower end of the capsule would clip into the ground during a crouch. The system began **shrinking the collider height** instead of repositioning it which prevented **physics overlap issues** with Unity’s collision system.
- **Bi-directional Responsiveness** which lowered the player smoothly when crouch was required and returned the player to full height once the overhead space cleared while maintaining **visual and physical continuity**.        

## The Result

- **No more getting stuck** under shallow curves or ceilings    
- Made the world feel more responsive and alive to player movement    
- Delivered a **"just works" experience** players never had to think about crouching    
- Supported fast traversal, exploration, and verticality across factories and voxel environments    

## Why It Matters

This system is a great example of technical design meeting player expectations. Instead of breaking immersion with clunky manual crouch toggles, it offered a **fluid and invisible solution** grounded in **physics, collision logic, and camera dynamics**.

It also required careful coordination between:

- **Physics systems**    
- **Camera behavior**    
- **Character controller states**    
- **UI/UX feel of player movement**