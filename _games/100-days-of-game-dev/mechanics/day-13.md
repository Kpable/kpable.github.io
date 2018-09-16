---
game: 100-days-of-game-development
images: 
- label: Arrive Behavior
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day13-sb-arrive/arrive.gif
- label: Wiggles
  link: https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day13-sb-arrive/wiggles.gif
---

<a name="day-13"></a>
### Day 13: Steering Behaviors - Arrive
#### July 6, 2018 

**Today's Focus**: Steering Behaviors - Arrive

**Details**:
  - Implement Arrive behavior
  - Learned delta time with these behaviors doesn't need to be directly applied as each frame will update all needed values
  - Learned difference between clamp and multiply
  - Learned obvious in hindsight lessons

**Thoughts** 
I put a lot of "learned" in the details because I spent a lot of time debugging this bevaior for 3 reasons. The first, arrive should you know arrive and that wasn't what I was seeing. This was because I was multiplying Time.deltaTime to the acceleration unecesesarily. It was giving me odd behavior. Second, I inteded to clamp the steering force to the max force of the vehicle but while my mind thought, "hmm this is clamping", what the code rightly saw was "hmm this steering force will be multiplied to max, got it". Once that finally stood out, problem three was a silly one. I had left seek behavior active when I was testing arrive. This resulted in arrive behavior with a giggle once it arrived as seek would always move past the mark and return. Seek has no chill and will always move at max force. 

<!-- 
**Examples**: 

#### Arrive Behavior
![Arrive Behavior](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day13-sb-arrive/arrive.gif)  

#### Wiggles
![Arrive and Seek Behavior = Wiggles](https://raw.githubusercontent.com/kpable/100-days-of-game-dev/master/images/day13-sb-arrive/wiggles.gif)  
 -->

**Link(s) to work**: [Github](https://github.com/Kpable/Kpable-Labs/tree/misc/steering-behavior/Assets/Misc/Steering%20Behaviors)

[Table of Contents](#toc)