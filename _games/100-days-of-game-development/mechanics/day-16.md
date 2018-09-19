---
game: 100-days-of-game-development
images: 
- label: Wander Behavior
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day16-sb-wander/wander.gif
- label: Wander Behavior Gizmos
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day16-sb-wander/wander-editor.gif
---

<a name="day-16"></a>
### Day 16: Steering Behavior - Wander
#### July 9, 2018 

**Today's Focus**: Steering Behaviors - Wander

**Details**:
  - Implemented wander
  - Struggled a lot
  - Wrote a bunch of debug to see what was going on with the values. 

**Thoughts** 
This behavior took me several days to work out. There were a lot of small difficulties that arose and then some required tweaking of parameters. First was with my random vectors, they always returned zero because of course i was using Random.Range of type int and not float. Next, was the target point wasnt translating with the vehicle position. There was more that required me to write debug code to visualize what was going on with the vector values. Got some gizmo drawing in. This made me consider adding a visualizer to the steering behaviors. Maybe a project for a later time. After 


<!-- **Examples**: 

#### Wander Behavior
![Wander Behavior](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day16-sb-wander/wander.gif)  

#### Wander Behavior Gizmos
![Wander Behavior](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day16-sb-wander/wander-editor.gif)  
 -->
**Link(s) to work**: [Github](https://github.com/Kpable/Kpable-Labs/tree/misc/steering-behavior/Assets/Misc/Steering%20Behaviors)

[Table of Contents](#toc)