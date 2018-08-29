---
fa_icon: fa-pause
description: |
  Convert Unity Tilemap to a Graph of Nodes. 
game: blade-of-time
---

## Design Challenge

{{ page.description }}

## Development Considerations

Stopping time would be quickest but that creates challenges for any time-based actions such as menu animation. Also changes to the settings mid game will need to be applied to the current level. 

![Game Pausing] [pause]{:class="image fit"}

<!--excerpt_end-->

## Then and Now Thoughts

> "I need to make time stop for the world but i still need it for any menu animation. I have to check that stopping and starting time works as expected, make the cursor come back for menu stuff and disappear again, make sure the options menu from the main menu works in the pause menu, just a lot of little things." 
**_- Past Me_**

> "There'll always be a lot of little things, just imagine how annoying it would've been for the player to not have a cursor when the menu came up. Those little things could have a big impact."
**_- Present Me_**

---

### The Short and Sweet of it


[Sebastian Lague's A* Video]: https://youtu.be/-L-WgKMFuhE

[A* Description]: https://www.geeksforgeeks.org/a-search-algorithm/

[Tilemap to Nodes]: https://pastebin.com/U2LastXy