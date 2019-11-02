---
game: 100-days-of-game-development
images: 
- label: Sprite split effect I was looking for 
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day3-world-wrap/ship-split.gif
- label: Behind the scenes in the editor
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day3-world-wrap/ship-split-editor.gif
- label: Also my lander ~~distraction~~ curiousity
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day3-world-wrap/lander.gif
---

<a name="day-3"></a>
### Day 3: Shmup World Wrap
#### June 26, 2018 

**Today's Focus**: Get Spaceship to World Wrap All Pretty Like

**Details**:
  - Shift ship position to wrap around defined world bounds. 
  - Simulate the sprite being sliced at edge of screen and appearing on other end of screen.
  - Got distracted for a bit and wondered if I can quickly tweak the Spaceship behavior to act as a lander. 


**Thoughts** 

I want to get the world wrap set up so that its not a sudden jump. I remembered reading an article, watching a video, and/or reading some design secrets in which instead of performing some fancy math and rendering magic, the appearance of the ship being sliced as it goes off screen and the other half showing up in the wrapped other side was done by creating ghost copies of the sprite that always follow the player's rotation and relative position. I don't know how this is going to work once more object need that "ghost" effect but we'll find out right. 

<!-- 
**Examples**: 

#### Sprite split effect I was looking for 
![World Wrap "Ghosting" Example](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day3-world-wrap/ship-split.gif) 

#### Behind the scenes in the editor
![World Wrap "Ghosting" In Editor](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day3-world-wrap/ship-split-editor.gif) 

#### Also my lander ~~distraction~~ curiousity
![Lander behavior Example](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day3-world-wrap/lander.gif) 
 -->

**Link(s) to work**:
- [Github (Spaceship)](https://github.com/Kpable/Kpable-Labs/tree/misc/spaceship-behavior/Assets/Misc/Spaceship%20Behavior)
- [Github (Lander)](https://github.com/Kpable/Kpable-Labs/tree/misc/spaceship-behavior/Assets/Misc/Lander%20Behavior)

[Table of Contents](#toc)