---
layout: post
title: Settings Menu – Scalable, Dynamic, and Platform-Aware
description: 
date: 2023-12-08 15:01:35 +0300
image: '/images/techtonica/techtonica-settings-4x3.png'
tags: [UI]
tags_color: '#3eb99a'
featured: true
---

As part of a broader UI refactor, I was responsible for engineering the **Settings Menu system** with a focus on making it **scalable, designer-friendly, and responsive to platform-specific and runtime needs**.

While I contributed to UI adjustments across several passes, my primary responsibility was implementing the **underlying systems that tracked, applied, and persisted setting values** across sessions and input devices.

---

### Key Responsibilities

- Refactored a prototype settings menu into a **production-ready system**.
- Developed a **modular settings architecture** supporting toggles, sliders, and dropdowns.
- Created tools for **designers to define and organize settings data**.
- Implemented runtime logic for **auto-configuration, persistence, and dynamic UI generation**.
- Ensured **input device flexibility** (mouse/gamepad) and **platform-specific visibility** of settings.
- Integrated the system with **persistent save/load**, **default fallbacks**, and **runtime application of changes**.

---

### System Design Overview

#### Dynamic UI Elements

To support future extensibility, I abstracted settings interactions into three reusable, configurable prefabs:
- **Toggle**
- **Slider**
- **Dropdown**

Each prefab supported runtime initialization via setting metadata and communicated changes via `OnValueChanged` events.

#### Designer-Facing Config Data

Each setting was defined via serialized fields on the menu prefab:
- Name & Category (Gameplay, Audio, etc.)
- Input Type (toggle/slider/dropdown)
- Value constraints
- Default value
- Applicable platform(s)
- Applicable game context (in-game vs. title screen)

While I advocated for ScriptableObject-based data, we opted to keep the config embedded for the time being due to production stability needs and QA overhead. This was a conscious tradeoff for risk mitigation during a critical phase.

#### Runtime Instantiation & Categorization

At startup, the system:
- Instantiated the correct prefab based on config.
- Assigned values, labels, and placement based on category.
- Automatically hid settings that didn’t apply to the current platform or context.
- Supported clean layout expansion for future settings.

#### Input-Responsive Design

The system was designed to:
- Support **hot-swapping between input devices**.
- Update button prompts and navigation based on the current control scheme.
- Preserve accessibility and clarity regardless of interaction method.

---

### Applying Settings at Runtime

Settings changes propagated through a centralized manager that:
- Applied changes immediately (when safe) or queued them for confirmation.
- Wrote changes to persistent storage.
- Ensured the appropriate game systems were updated (e.g., audio, display, input bindings).

---

### Takeaways

This system showcases my strengths in:
- **Gameplay systems programming**: building extensible, real-time systems that affect core game experience.
- **UI engineering**: bridging designer intent and runtime behavior across input types and platforms.
- **Technical design**: thinking through edge cases, scalability, and production constraints to make sustainable decisions.

The result was a flexible, future-proof settings system that could grow with the game and adapt to its players.

<div class="gallery-box">
  <div class="gallery gallery-columns-2">
    {% include img.html src ="/images/techtonica/techtonica-settings-01.png" alt="Lifestyle" caption="A stunning shot" %}
    {% include img.html src ="/images/techtonica/techtonica-settings-02.png" alt="Inspiration" caption="A stunning shot" %}
    {% include img.html src ="/images/techtonica/techtonica-settings-03.png" alt="Friends" caption="A stunning shot" %}
    {% include img.html src ="/images/techtonica/techtonica-settings-04.png" alt="Computers" caption="A stunning shot" %}
  </div>
  <p>A gallery of stunning shots</p>
</div>