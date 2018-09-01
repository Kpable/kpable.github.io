---
category: artificial-infiltration
game: artificial-infiltration
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
- Detected what edge the player is on
- Detected what edge the teleporter's linked destination is on
- Added movement capabilities to player and camera 
- Identified various teleportation cases 
- Added checks to determine when the player and camera have to move and/or rotate
- Made sure every teleporter, destination, and the player always stay on the respective tower's playing square.

---

## The Teleportation Process

The whole teleportation process initiates one main aspects of the game, rotation of the player and the camera. It also adds to those mechanics by including movement as well as rotation. 

In the end the entire process looked a bit like the following:

- Player enters the teleporter
- Using the edge the player is on and the edge the destination is on determine rotation and movement. 
- Disable player input, collision, and gravity
- Send the player flying through the world to the destination
- Send the camera flying if necessary along with the player
- Enable player input, collision, and gravity

But of course, this was not as simple as it sounds to implement.

## Edge Identification

Throughout this process it became important to be able to identify the nearest edge to an object anywhere in the world. To do that first I identified the nearest tower to the object and from that tower's information regarding origin and size. 

[Utils.cs]
{% highlight c# %}
public class CubeSpace : MonoBehaviour {

    [Tooltip("Sets the size of the cube for use by other objects")]
    public float cubeSize = 1;                  // The size of the cube
    [HideInInspector]
    public Vector3 origin = Vector3.zero;       // The cube's origin.
    ...
}
{% endhighlight %}

I use that information to determine the locations of all four edges of the tower and iterate through those locations to find which yields the smallest distance from the object in question. 

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

Using the above, I determined the edge the player is on when entering the teleporter and the edge the teleporter's linked destination is on. With that information I proceeded to initiate the corner rotation mechanic as normal. 

## Moving the Player and Camera

With the rotation already taken care of, player control will remain consistent as the player teleports from place to place and the camera will rotate to face the player. Movement however doesn't happen in a blinking fashion. The player object moves freely in world space from the teleporter to the linked destination and the camera object will need to adjust to keep up with the player. 

As with the interpolation of the rotation around corners for both the player and camera, I added a similar interpolation of their positions as well. 

[PlayerEdgeMovement.cs]
{% highlight c# %}
void Update () {
    ...
    if (moving)
    {
        // Add time in seconds
        currentMovementTime += Time.deltaTime; 
        // Dont go more than the set rotationTime                                     
        currentMovementTime = Mathf.Clamp(currentMovementTime, 0, movementTime);    

        // Lerp position 0 to 1 for duration rotationTime. 
        float moveLerpPos = currentMovementTime / movementTime;
        currentMovementTime = Mathf.Clamp(currentMovementTime, 0, movementTime);

        if (moveLerpPos >= 1 && moving)
        {
            // Keep it at a max of 1 so we dont accidently go over our desired angle.
            moveLerpPos = 1;
            // Set the current edge to the destination since we've reached it
            transform.position = destinationPosition;  
            // We're done rotating.
            moving = false;

            if (!rotating && !moving)
                EnablePlayerMovement(true);
        }

        // Angle between currentAngle and destinationAngle at lerpPos
        Vector3 pos = Vector3.Lerp(transform.position, destinationPosition, moveLerpPos);
        transform.position = pos;
    }
}
{% endhighlight %}

With movement added to the player and the camera, the next step became know when to move and when to rotate.

## Types of Teleportation

To allow for the level designers on my team to freely place teleporters and teleporter destinations freely in the world along the towers, I had to identify the various cases in which the teleportation would occur and evaluate each case against the player and the camera. 

Considering the destination's location relative to the player's location, if the destination is:
- on the same edge, on the same tower
    - the player moves but does not rotate
    - the camera neither moves or rotates 
- on a different edge, on the same tower 
    - the player moves and rotates
    - the camera does not move but rotates
- on the same edge, on a different tower
    - the player moves and does not rotate
    - the camera moves and does not rotate
- on a different edge, on a different tower
    - the player moves and rotates
    - the camera moves and rotates

To account for these cases I separated the initiation of movement and rotation for both the player and the camera and included checks that determine if the movement or rotation occurs. 

[PlayerEdgeMovement.cs]
{% highlight c# %}
// Rotate the player to a specific edge
public void  RotateToEdgeRotation(EdgeOfCube edge)
{
    // Only rotate to the edge if its different.
    if (edge != currentEdge)
    {
        currentRotationTime = 0;            // Reset rotation time
        destinationEdge = edge;             // Set our goal
        rotating = true;                    // Begin rotating
    }
}

// Move the player to a specific position
public void MoveToPosition(Vector3 des)
{
    currentMovementTime = 0;                // Reset movement time
    destinationPosition = des;              // Set our goal 
    moving = true;                          // Begin Movement
}

// Move the player to a specific position and Edge
public void MoveAndRotateToEdgePosition(Transform destination)
{
    EdgeOfCube edgeDes = CubeEdges.DetectEdge(destination);

    EnablePlayerMovement(false);
    
    RotateToEdgeRotation(edgeDes);
    MoveToPosition(destination.position);

}
{% endhighlight %}

The camera too followed the same method of checking each case give the destination tower and edge.

[CameraEdgeMovement.cs]
{% highlight c# %}
public void MoveAndRotateToEdgePosition(CubeSpace desCube, EdgeOfCube edge)
{
    if (nearestCube != desCube)             // If we are changing cubes
    {
        nearestCube = desCube;              // Set the new cube
        radius = desCube.cubeSize;          // Change the radius
        MoveToPosition(edge.EdgeToAngle());
    }

    if (currentEdge != edge)
    {
        RotateToEdge(edge);
    }
}
{% endhighlight %}

Adding these changes to the player and the camera, as well as helper methods for identifying necessary information leaves the teleport trigger with the simple task of forwarding information to the player and the camera. 

[TeleportTrigger.cs]
{% highlight c# %}
void OnTriggerEnter(Collider col)
{
    if (col.gameObject.CompareTag("Player"))
    {
        // Move the focus point to new Cube
        GameObject.Find("Camera Focus Point").transform.position = CubeEdges.DetectNearestCube(teleportDestination).origin;

        // Disable player's clamping
        col.gameObject.GetComponent<ClampToCubeEdges>().enabled = false;

        // Let the player move through solid objects
        col.gameObject.GetComponent<BoxCollider>().enabled = false;
               
        // Rotate the player appropriately and move him to our teleport destination
        col.gameObject.GetComponent<PlayerEdgeMovement>().MoveAndRotateToEdgePosition(teleportDestination);

        // Move and rotate the camera as well. 
        Camera.main.GetComponent<CameraEdgeMovement>().MoveAndRotateToEdgePosition(CubeEdges.DetectNearestCube(teleportDestination), edge);

    }
}
{% endhighlight %}

## Edge Clamping

You may have noticed above, the class ClampToCubeEdges being disabled so a bit about that.

With a lot of the gameplay focused on locking movement on a specific axis on a given plane around the tower, it became important for the placement of objects to be exact at least on the axis that is locked for the given edge of the tower. 

Rather than try to tell my teammates "hey, make sure the position of the objects you place have that one axis exactlty right and remember that axis changes for each side on each tower and varies for each tower depending on size and position", i just went with telling them "Place the object relatively close to the edge you want it on". 

That way they didn’t have to worry about the exact numbers of axes or towers or edge. That’s what I was there for. And by that of course I mean, that’s what I wrote code to be there for.

[ClampToCubeEdges.cs]
{% highlight c# %}
public class ClampToCubeEdges : MonoBehaviour {
    public bool continuousClamping = false;         // Whether to continuously clamp the object

    private EdgeOfCube currentEdge;

    void Start()
    {
        // Detect current edge of cube based on transform. 
        currentEdge = CubeEdges.DetectEdge(transform);        
        
        // Fix rotation if necessary
        if(transform.rotation.eulerAngles.y != currentEdge.EdgeToRotation())    
            transform.rotation = Quaternion.Euler(new Vector3(transform.rotation.x, currentEdge.EdgeToRotation(), transform.rotation.z));

        Clamp();
    }

    ...

    private void Clamp()
    {
        transform.position = CubeEdges.Clamp(transform);
    }
}
{% endhighlight %}

[Utils.cs]
{% highlight c# %}
//Clamp position to a Cube Edge
public static Vector3 Clamp(Transform t)
{
    CubeSpace nearestCube = DetectNearestCube(t);

    float offset = t.localScale.x / 2;
    float edgeDistance = (nearestCube.cubeSize / 2) - offset;

    Vector3 pos = t.position;

    EdgeOfCube edge = RotationToEdge(t.rotation.eulerAngles.y);

    Vector3 cubePos = nearestCube.origin;


    switch (edge)
    {
        // Left and right is the X axis: - 0 +
        case EdgeOfCube.Bottom:
            pos.x = Mathf.Clamp(pos.x, -edgeDistance + cubePos.x, edgeDistance + cubePos.x);
            pos.z = Mathf.Clamp(pos.z, -edgeDistance + cubePos.z, -edgeDistance + cubePos.z);
            break;
        // Left and right is the X axis: - 0 +
        case EdgeOfCube.Right:
            pos.x = Mathf.Clamp(pos.x, edgeDistance + cubePos.x, edgeDistance + cubePos.x);
            pos.z = Mathf.Clamp(pos.z, -edgeDistance + cubePos.z, edgeDistance + cubePos.z);
            break;
        // Left and right is the X axis reversed: + 0 -
        case EdgeOfCube.Top:
            pos.x = Mathf.Clamp(pos.x, -edgeDistance + cubePos.x, edgeDistance + cubePos.x);
            pos.z = Mathf.Clamp(pos.z, edgeDistance + cubePos.z, edgeDistance + cubePos.z);
            break;
        // Left and right is the Z axis reversed: + 0 -
        case EdgeOfCube.Left:
            pos.x = Mathf.Clamp(pos.x, -edgeDistance + cubePos.x, -edgeDistance + cubePos.x);
            pos.z = Mathf.Clamp(pos.z, -edgeDistance + cubePos.z, edgeDistance + cubePos.z);
            break;

        ...
    }
    return pos;
}
{% endhighlight %}


I just want to mention, this feature and its rewrite of the majority of the code that was written at the time was the most effort I put into a __half second transition__. 


[teleportation]:            {{ site.url }}/assets/images/artificial-infiltration/teleportation.gif

[TeleportTrigger.cs]:       https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Triggers/TeleportTrigger.cs
[CubeSpace.cs]:             https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/CubeSpace.cs
[Utils.cs]:                 https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Utils.cs
[PlayerEdgeMovement.cs]:    https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Player/PlayerEdgeMovement.cs
[CameraEdgeMovement.cs]:    https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Camera/CameraEdgeMovement.cs
[ClampToCubeEdges.cs]:      https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Player/ClampToCubeEdges.cs
