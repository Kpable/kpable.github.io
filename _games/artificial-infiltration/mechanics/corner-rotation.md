---
category: artificial-infiltration
game: artificial-infiltration
fa_icon: fa-retweet
description: |
  Upon player reaching a corner of the tower, gameplay focus shifts to that side of the tower. 
image: corner.gif
---

## Design Challenge

{{ page.description }}

## Development Considerations

With the designed player control for this 2.5D platformer being left, right, and jump, I considered how to both maintain that control constant and maintain view of the play space as the playing field shifted planes in 3D space. 

![Corner Rotation] [corners]{:class="image fit"}

<!--excerpt_end-->

## Then and Now Thoughts

> "So, to get this going I just need to make sure the player rotates about itself to maintain left/right platformer control, the camera rotates about the tower at a set distance to maintain view of the play space, and the player triggers both rotations once a corner is reached. Doesn't sound too hard, shouldn't be too bad." 
**_- Past Me_**

>"No, Past Me, just no. You've got the right idea, but don’t ever assume that. You have no idea what designs may change or how other features will interact with this one. Don't worry though, you'll find out the *fun* way." 
**_- Present Me_**

## TL;DR
- Set up triggers at each corner to identify __which corner was triggered__.
- Created a way to determine __what edge the payer is on__.
- Figured out __which edge the player is going to__.
- Created relationship between __edge and player rotation__.
- Lerped player rotation between __start and end rotations__ using edge/rotation relationship.
- Identified necessary __camera positioning for each edge__.
- Created relationship between __edge and angles in a circle__.
- Lerped camera position along circular path between __start and end angles__ using edge/angle relationship.


---

### Corner Triggering

I started to work through this in the order I expected the player to experience. So first step, detecting when the player has reached a corner. 

I placed four trigger colliders, one at each corner to detect when the player enters a corner. Because the player will be traveling upwards and as the programmer on the team, not knowing how tall the level designer will make a level’s tower, I also attach a quick script to the corner trigger to always follow the players vertical position. Player goes up, so do the triggers.

Upon entering the trigger, both the player and camera will be alerted to begin rotating onto the new edge. This also tells the player and camera __which corner was triggered__.

[CornerSwitch.cs]

{% highlight c# %}
void OnTriggerEnter(Collider col)
{
    if (!insideTrigger && col.gameObject.name == "Player")
    {
        cameraObject
            .GetComponent<CameraEdgeMovement>()
            .RotateAroundCorner(edge);
        player
            .GetComponent<PlayerEdgeMovement>()
            .RotateAroundCorner(edge);
    }
}
{% endhighlight%}

Later in development, a design change from a 'one tower, constant size, at world origin' plan to a 'multiple towers, varying size, various locations' plan, led me to create a helper script to automatically create and place the four corner triggers based on the square's size. 

[Corners.cs]
{% highlight c# %}
// Sets a corner at the 4 corners
void PositionCornerTriggers()
{
    if (editInGame) size = customSize;
    else size = nearestCube.cubeSize / 2;

    ...

    Vector3 pos = new Vector3(size + nearestCube.origin.x, 0, 
                                size + nearestCube.origin.z);
    corners[0].transform.position = pos;
    corners[0].GetComponent<Corner_Switch>()
        .SetCorner(EdgeOfCube.TopRightCorner);

    pos = new Vector3(-size + nearestCube.origin.x, 0, 
                        size + nearestCube.origin.z);
    corners[1].transform.position = pos;
    corners[1].GetComponent<Corner_Switch>()
        .SetCorner(EdgeOfCube.TopLeftCorner);

    pos = new Vector3(size + nearestCube.origin.x, 0, 
                        -size + nearestCube.origin.z);
    corners[2].transform.position = pos;
    corners[2].GetComponent<Corner_Switch>()
        .SetCorner(EdgeOfCube.BottomRightCorner);

    pos = new Vector3(-size + nearestCube.origin.x, 0, 
                        -size + nearestCube.origin.z);
    corners[3].transform.position = pos;
    corners[3].GetComponent<Corner_Switch>()
        .SetCorner(EdgeOfCube.BottomLeftCorner);
}
{% endhighlight %}

I tried to make it as easy as possible for my other team members to be able create a new tower and have it function appropriately. For this script to work, the game object containing this script just had to placed close enough to the tower and it would be able to position each trigger appropriately based on the nearest tower's position and size where size is the length or width of the square. But I digress.  

### Corner Rotations 

Next up was getting the player and the camera to rotate around a corner. For this I took pen to paper to figure out the kind of rotations both objects need to make and the similarities between them. 

For each of the four corners on the square there’s both the clockwise and counter-clockwise rotation.

![The Eight Rotations] [corner-rotations]{:class="image fit"}

To determine which direction to rotate the playing field I needed to determine which edge the player is on. 

### Edge Tracking

To identify which edge of the square the player is on I looked at the tower from above and designated the four edges. 

![The Square From Above] [above_axis]{:class="image fit"}

[Utils.cs]
{% highlight c# %}
public enum EdgeOfCube 
{ 
    Bottom, 
    Right, 
    Top, 
    Left, 
    BottomRightCorner, 
    BottomLeftCorner, 
    TopRightCorner, 
    TopLeftCorner, 
    Lost 
}
{% endhighlight %}

With each edge identified, I proceeded to find a method to find the edge the player is on given 
- the player's position in the world
- the position of all four edges of any given tower in the world

I do this by first locating the nearest tower to the player, then finding the nearest edge of that tower to the player. 

[Utils.cs]
{% highlight c# %}
// Returns the Cube info of the nearest Cube
public static CubeSpace DetectNearestCube(Transform t)
{
    ...

    for (int i = 0; i < cubes.Length; i++)
    {
        CubeSpace currentCube = cubes[i].GetComponent<CubeSpace>();

        currentDistance = 
            Vector3.Distance(t.position, currentCube.origin);

        // If first entry or this entry is closer than the previous
        if (i == 0 || minDistance > currentDistance )
        {
            minDistance = currentDistance;
            closestCube = currentCube;
        }
        
    }

    ...

    return closestCube;
}

public static EdgeOfCube DetectEdge(Transform t)
{ 
    ...
    
    // Sides

    // Bottom - fixed negative z pos, variable x pos
    else if (t.position.z == -edgeDistance + cubePos.z && 
            t.position.x > -edgeDistance + cubePos.x && 
            t.position.x < edgeDistance + cubePos.x)
        edge = EdgeOfCube.Bottom;
    // Top -    fixed positive z pos, variable x pos
    else if (t.position.z == edgeDistance + cubePos.z && 
            t.position.x > -edgeDistance + cubePos.x && 
            t.position.x < edgeDistance + cubePos.x)
        edge = EdgeOfCube.Top;
    // Left -   fixed negative x pos, variable z pos
    else if (t.position.x == -edgeDistance + cubePos.x && 
            t.position.z > -edgeDistance + cubePos.z && 
            t.position.z < edgeDistance + cubePos.z)
        edge = EdgeOfCube.Left;
    // Right -  fixed positive x pos, variable z pos
    else if (t.position.x == edgeDistance + cubePos.x && 
            t.position.z > -edgeDistance + cubePos.z && 
            t.position.z < edgeDistance + cubePos.z)
        edge = EdgeOfCube.Right;

    ...

    return edge;
}
{% endhighlight %}

Now we know __which edge the player is on__ and __which corner the player triggered__ which gives us __which edge the player is going to__. With that additional information, I went on to consider how to rotate the player. 

### Player Rotation

For each edge the player is on the left and right axis changes.

![Four Axes] [four-axes]{:class="image fit"}

Because of this, instead of having the player object move left and right with respect to world space, I instead set the input to move left and right with respect to the player. This lets me be sure that the player object will always move left when the player wants to left and same for moving right. 

Left and right when relative to an object is dependent on the objects rotation. So, the player object has to be rotated at each corner. AS the player moves clockwise around the tower, the player should rotate clockwise around the tower as well and vise-versa.

Starting with the bottom edge where the player's axis matches the world's axis, I identified all the rotation values the player object should have on any given side and created a helper function to retrieve those values. 

[Utils.cs]
{% highlight c# %}
// Returns the rotation along the y axis of object's self 
// based on the edge
public static float EdgeToRotation(this EdgeOfCube edge)
{
    float rotation = 0;

    switch (edge)
    {
        case EdgeOfCube.Bottom:
            rotation = 0;
            break;
        case EdgeOfCube.Right:
            rotation = 270f;
            break;
        case EdgeOfCube.Top:
            rotation = 180;
            break;
        case EdgeOfCube.Left:
            rotation = 90;
            break;

            ...

        default:
            break;
    }

    return rotation;
}
{% endhighlight %}

Knowing which edge the player is on and which edge the player is going to, this relationship gives us the start and end rotations. It would be simple to just say, 

```
player.rotation = endRotation;
```

But it’s not about me or about code simplicity, it's about the player's experience and we want to make the player feel like they are rotating around a corner. One way to do that is to let them see themselves rotating around a corner. I do this by lerping between the start and end rotation values across an assigned duration. 

[PlayerEdgeMovement.cs]
{% highlight c# %}
void Update () {
    if (rotating)
    {
        // Add time in seconds
        currentRotationTime += Time.deltaTime;
        // Dont go more than the set rotationTime
        currentRotationTime = 
            Mathf.Clamp(currentRotationTime, 0, rotationTime);
        // Lerp position 0 to 1 for duration rotationTime. 
        float lerpPos = currentRotationTime / rotationTime;

        if (lerpPos >= 1 && rotating)
        {               
            // Keep it at a max of 1 so we don’t accidently go over  
            // our desired angle.
            lerpPos = 1;                            
            // Set the current edge to the destination since we've
            // reached it
            currentEdge = destinationEdge;          
            // We're done rotating.
            rotating = false;                      

            ...
        }

        // Angle between currentAngle & destinationAngle at lerpPos
        float angle = Mathf.LerpAngle(
            currentEdge.EdgeToRotation(), 
            destinationEdge.EdgeToRotation(), 
            lerpPos);

        // Grab and set the player's rotation.
        Vector3 rot = transform.rotation.eulerAngles;
        rot.y = angle;
        transform.rotation = Quaternion.Euler(rot);
    }
}
{% endhighlight %}

That’s how the player rotates around corners and how it looks good too. So why not do something similar for the camera.

### Camera Rotation

First step was to satisfy the design requirement of always having the full length of a tower side and the player visible to the camera. I found that is possible using Unity's default camera settings and setting the camera back the same distance from the tower's origin as the length of either of the square tower's sides. 

![Camera Distance From Center] [camera-center-distance]{:class="image fit"}

This is assuming a 16:9 aspect ratio, as other ratios cut off a bit of the sides of the desired view. I remedied that by adjusting the camera's field of view depending on detected aspect ratio.  

Knowing that __how far the camera should be__ is equivalent to the size of the tower itself, I proceeded to mark the remaining three positions the camera will be through the game on the XZ plane. like the corner triggers, the camera will also follow the player's vertical position throughout play. 

![Camera Waypoints] [camera_waypoints]{:class="image fit"}

Knowing __where the camera is__ on the XZ plane and __where the camera needs to go__ for each edge, I immediately thought of performing the same lerping as with the player's rotation, just on the camera's X and Z positions. But quickly found that would not satisfy the design requirement as previously mentioned. During the camera's movement along a linear path to the next position, you'd lose sight of the player and most of the current playing field, which would be the two edges involved in the rotation. 

![Problem with Linear Camera Movement] [camera-wrong-paths]{:class="image fit"}

To fix that, I knew I had to keep the camera at the same distance away from the origin at all time during its movement. With constant distance from tower origin and four target locations to hit in mind, movement along a circle quickly came to mind. 

![Camera Movement Axis] [way-above-axis]{:class="image fit"}

I created a relationship between the edge and the angle of a circle on the XZ plane in world space.

[Utils.cs]
{% highlight c# %}
// Returns the angle of edge on X-Z axis in world space
public static float EdgeToAngle(this EdgeOfCube edge)
{
    float angle = 0;

    switch (edge)
    {
        case EdgeOfCube.Bottom:
            angle = 270f;
            break;
        case EdgeOfCube.Right:
            angle = 0f;
            break;
        case EdgeOfCube.Top:
            angle = 90f;
            break;
        case EdgeOfCube.Left:
            angle = 180f;
            break;

            ...

        default:
            break;
    }

    return angle;
}
{% endhighlight %}

Finally, to make it look nice, I do the same lerping I did for the player but instead of lerping the camera's rotation, I instead lerp the __start and end angles__ using the edge to angle relationship and set the camera's position by plugging in the current angle value into the parametric equation for movement along the circumference of a circle with radius equal to the size of the tower and tower origin.

[CameraEdgeMovement.cs]
{% highlight c# %}
void Update () {

    if (movingAroundCube)
    {
        ...

        // Parametric Equation for rotating around a circle
        Vector3 pos = transform.position;
        pos.x = nearestCube.origin.x + 
            Mathf.Cos(angle * Mathf.Deg2Rad) *
            radius;
        pos.z = nearestCube.origin.z + 
            Mathf.Sin(angle * Mathf.Deg2Rad) * 
            radius;
        transform.position = pos;
    }

    ...
}
{% endhighlight %}

With that, we have the core of this feature. There were a lot of other considerations that were discovered during further development and testing. The following are some of the additional changes that were made because of their (*fun discoveries*):

- Disabling player control during rotation. (*The player could move left/right mid rotation moving towards an infinite fall*)
- Preventing triggering while rotating. (*The shape and size of the corner and player colliders would occasionally cause a collision while rotating creating an infinite cycle of rotation*)
- Clamping the player's position on an edge. (*The player would be offset the edge's center line, didn’t look or feel good*)
- Maintain momentum after rotating. (*Entering mid jump would stop the jump after rotating and just drop the player to the floor*)
- Forcibly pushing the player out of a corner trigger on completion of trigger (*Even with disabling player control and adjusting comer and player colliders, the infinite cycle of rotation would still occasionally occur*)

By *fun discoveries* I mean bugs. In case that wasn’t apparent. These are just a few off the top of my head too. Let's just say it was a memorable feature.



[corners]:                  {{ site.url }}/assets/images/artificial-infiltration/corner.gif
[camera_waypoints]:         {{ site.url }}/assets/images/artificial-infiltration/camera_waypoints.png
[camera-center-distance]:   {{ site.url }}/assets/images/artificial-infiltration/camera-center-distance.png
[camera-wrong-paths]:       {{ site.url }}/assets/images/artificial-infiltration/camera-wrong-paths.png
[way-above-axis]:           {{ site.url }}/assets/images/artificial-infiltration/way-above-axis.png
[four-axes]:                {{ site.url }}/assets/images/artificial-infiltration/four-axes.png
[above_axis]:               {{ site.url }}/assets/images/artificial-infiltration/above_axis.png
[corner-rotations]:         {{ site.url }}/assets/images/artificial-infiltration/corner-rotations.png


[CornerSwitch.cs]:         https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Movement/Object/Corner_Switch.cs
[Corners.cs]:               https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Movement/Object/Corners.cs
[Utils.cs]:                 https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Utils.cs
[CameraEdgeMovement.cs]:    https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Camera/CameraEdgeMovement.cs
[PlayerEdgeMovement.cs]:    https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Player/PlayerEdgeMovement.cs