---
game: 100-days-of-game-dev
images: 
- label: Evade Behavior
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day15-sb-evade/evade.gif
---
<a name="day-15"></a>
### Day 15: Steeriing Behaviors - Evade
#### July 8, 2018 

**Today's Focus**: Steering Behaviors - Evade

**Details**:
  - Implemented Evade
  - Added walls in which all agents flee from
  - Combined Arrive and Flee behaviors on the Invader

**Thoughts** 
I had a bit of trouble with this one but the theory behind the behavior is pretty straight forward, evade the target vehicle by fleeing the predicted position given their velocity and position. Theres a bug in which the velocity of the evading vehicle isn't reset. After all, I'm grabbing only the steering force and applying it to the acceleration. That force goes to zero if the evade target leaves the range so the velocity doesnt change. I will have to come back to this but for now I'm satisfied 

<!-- 
**Examples**: 

#### Evade Behavior
![Evade Behavior](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day15-sb-evade/evade.gif)  
 -->
 
**Link(s) to work**: [Github](https://github.com/Kpable/Kpable-Labs/tree/misc/steering-behavior/Assets/Misc/Steering%20Behaviors)

[Table of Contents](#toc)