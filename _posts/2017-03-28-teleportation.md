---
category: artificial-infiltration
fa_icon: fa-toggle-up
description: |
  Create a teleporter that will teleport the player to a destination location. That location can be any edge on the current tower or any edge on another tower.
---

## Design Challenge

{{ page.description }}

## Development Considerations

The destination will need to have an edge associated with it and that edge will have to be identified through the destination's position in the world. The edge will belong to a tower anywhere in the world which would make the destination's position should relate to the tower, which given the tower's origin and size would give the information on the tower's four edges.

![Teleportation] [teleportation]{:class="image fit"}

<!--excerpt_end-->

## Then and Now Thoughts

> "The corner rotation is already done and there was no previous mention of multiple towers. I'm going to have to rewrite most of the code that identifies where the player is and where the player is going. Sigh..." 
**_- Past Me_**

> "Yeah, that stuff happens sometimes, but now you know not to code with the assumptions that designs will stay the same. I like how accommodating you tried to make the code after that to try to keep things working given the mysterious unknown variable that is your teammates." 
**_- Present Me_**

## TL;DR

---

[teleportation]:            {{ site.url }}/assets/images/artificial-infiltration/teleportation.gif

[TeleportTrigger.cs]:       https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Triggers/TeleportTrigger.cs
[CubeSpace.cs]: 			https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/CubeSpace.cs