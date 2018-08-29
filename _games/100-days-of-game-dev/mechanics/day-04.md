---
game: 100-days-of-game-dev
images: 
- label: Single shot blaster weapon
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day4-shmup-weapons/firing-blaster.gif
- label: Spread shot blaster weapon
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day4-shmup-weapons/firing-spread.gif
---

<a name="day-4"></a>
### Day 4: Shmup Weapons
#### June 27, 2018 

**Today's Focus**: Shmup Weapons systems 

**Details**:
  - Imported weapons implementation from older tutorial. Not final but good enough to get a handle on how to implement weapons system. 
  - Updated projectiles to utilize previously done object pooling. 
  - Ensuring projectiles share rotation on ship when firing. 


**Thoughts** 

I remembered a tutorial I completed a while ago in which a similar weapons system was implemented. That implementation didn't utilize object pools and was more of the strafe left and right kind of shmup but I liked how the weapon details were defined in one place and it was retrieved when setting the projectile type. 

<!-- 
**Examples**: 

#### Single shot blaster weapon
![Single shot blaster Example](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day4-shmup-weapons/firing-blaster.gif) 

#### Spread shot blaster weapon
![Spread shot blaster Example](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day4-shmup-weapons/firing-spread.gif) 

 -->

**Link(s) to work**: [Github](https://github.com/Kpable/Kpable-Labs/tree/misc/shmup-weapons/Assets/Misc/Shmup%20Weapons)

[Table of Contents](#toc)