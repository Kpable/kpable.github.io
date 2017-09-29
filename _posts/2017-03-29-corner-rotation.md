---
layout: post
category: artificial-infiltration
permalink: :categories/:title
---

#### Design Challenge
Upon player reaching a corner of the tower, gameplay focus shifts to that side of the tower. 

#### Development Considerations
With the expected player control for this 2.5D platformer being left, right, and jump, I considered how to both maintain that control constant and maintain view of the play space as the playing field shifted planes in 3D space. 

![Corner Rotation]({{ site.url }}/assets/corner.gif)

<!--excerpt_end-->

#### High Level Considerations
- Player rotates about self to maintain left/right platformer control.
- Camera rotates about tower to maintain view of the play space.
- Player triggers both rotations once a corner is reached.

##### Corner Triggering

Placed at the four corners of the square there are coliders in which the player will trigger upon entering the coner. 

Corners.cs
Corner_Switch.cs

##### Corner Rotations 

For each of the four corners on the square theres both the clockwise and counter-clockwise rotation.

![The Eight Rotations]({{ site.url }}/assets/corner-rotations.png)

To determine which direction to rotate the playing field I needed to determine which edge the player is on. 



##### Edge Tracking

To identify which edge of the square the player is on I took a look at the tower from above and designated the four edges. 

![The Square From Above]({{ site.url }}/assets/above_axis.png)

[Utils.cs](https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Utils.cs)
{{% highlight c# %}}
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
{{% endhighlight %}}

##### Player Rotation

For each edge the player is on the left and right axis changes.

![Four Axes]({{ site.url }}/assets/four-axes.png)

<!-- ##### Top Side Axis

![Square Top Axis]({{ site.url }}/assets/top_axis.png)

##### Bottom Side Axis

![Square Bottom Axis]({{ site.url }}/assets/bottom_axis.png)

##### Left Side Axis

![Square Left Axis]({{ site.url }}/assets/left_axis.png)

##### Right Side Axis

![Square Right Axis]({{ site.url }}/assets/right_axis.png) -->

Because of this, instead of having the player object move left and right in the world, i instead set the input to move left and right with respect to the players current rotation. This let me be sure that the player object will always move left when the player wants to left and same for right. 

But that only works for the bottom edge of the tower. So the player object has to be rotated at each corner. 

{{% highlight c# %}}
	// Returns the rotation along the y axis of object's self based on the edge
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

	        // we dont want to return a diagonal rotation. 
	        case EdgeOfCube.BottomRightCorner:
	        case EdgeOfCube.BottomLeftCorner:
	        case EdgeOfCube.TopRightCorner:
	        case EdgeOfCube.TopLeftCorner:
	        case EdgeOfCube.Lost:
	        default:
	            break;
	    }

	    return rotation;
	}
{{% endhighlight %}}

PlayerEdgeMovement.cs

##### Camera Rotation

performing camera rotation 

![Camera Distance From Center]({{ site.url }}/assets/camera-center-distance.png)
![Camera Waypoints]({{ site.url }}/assets/camera_waypoints.png)
![Problem with Linear Camera Movement]({{ site.url }}/assets/camera-wrong-paths.png)
![Camera Movement Axis]({{ site.url }}/assets/way-above-axis.png)

CameraEdgeMovement.cs
