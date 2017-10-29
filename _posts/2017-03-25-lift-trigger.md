---
category: artificial-infiltration
fa_icon: fa-angle-double-up
description: |
  Create a trigger that, when entered, would add force to whatever entered it. 
---

#### Design Challenge
{{ page.description }}
<!-- Create a trigger that, when entered, would add force to whatever entered it.  -->

#### Development Considerations
The force applied will have to be applied to any object that enters the trigger, not just the last one. That force will have to be continuous unless a single shot burst is desired. 

![Lift Trigger] [lift-trigger]{:class="image fit"}

<!--excerpt_end-->

#### Then and Now Thoughts

> "Alright, I don’t know which direction the designer will want the force to be applied so I’ll have to account for that. Also since there’s talk of having an enemy follow the player around I won’t know how many objects will be in this trigger at the same time. Better play it safe and account for the unknowns." 
**_- Past Me_**

> "Regrettably, this feature didn’t make it into the final game but given the little information you had at the time, rather impressive job accounting for various possibilities." 
**_- Present Me_**

#### TL;DR
- Maintained a list of physics bodies to apply force to
- Continuously applied set force to list of bodies
- Alternative to apply larger force in one burst 
- Added simple method for choosing force direction


---

To account for the unknown regarding number of objects that will be in the trigger simultaneously, I created a list to keep track of the and upon entering the trigger the object, should it contain a physics body will be added to the list.

[LiftTrigger.cs]
{% highlight c# %}
List<Rigidbody> liftTargets;
...
void OnTriggerEnter(Collider col)
{
    //Grab the Rigidbody
    Rigidbody body = col.GetComponent<Rigidbody>();             
    //Check if its present
    if ( body != null)                                       
    {
        ...
        //Add to list of bodies to get handsy with
        liftTargets.Add(body);                                  
        ...      
    }
}
{% endhighlight %}

As well as removed from the list once they exit the trigger.

[LiftTrigger.cs]
{% highlight c# %}
void OnTriggerExit(Collider col)
{
    ...
    //Check if it's currently in the list of bodies
    if ( liftTargets.Contains(body) )                       
    {
        //Remove them if they are
        bool success = liftTargets.Remove(body);            
        if (!success) 
            Debug.LogWarning("Failed to let go of this body: " + 
                    body.gameObject.name);
    }
    ...
}
{% endhighlight %}

Then while the physics bodies are in the trigger, a set force will be applied to them.

[LiftTrigger.cs]
{% highlight c# %}
void FixedUpdate()
{
    if( liftTargets.Count > 0 )
    {
        //Continuously add liftForce to the rigid
        //bodies in the trigger
        ...
        liftTargets
            .ForEach(body => {
            body.AddForce(
                direction.Trans(body.transform) * liftForce );
        }); // Get handsy with that body
    }
}
{% endhighlight %}

Alternatively, if the force should be applied in a single burst shot, acting more like a cannon than a gentle hovering force, instead of adding the physics body to a list, force is applied the moment it enters the trigger.

[LiftTrigger.cs]
{% highlight c# %}
List<Rigidbody> liftTargets;
...
void OnTriggerEnter(Collider col)
{
    ...
    if (singleShot)
    {
        // Just once.. just once 
        body.AddForce(direction.Trans(body.transform) * liftForce);
    }
    else
    {
        //Add to list of bodies to get handsy with
        liftTargets.Add(body);
    }
    ...
}
{% endhighlight %}

As far as direction goes, as I didn’t know how this trigger was to be used at the time, I added a means for the designer to also choose the direction the force is applied easily from Unity's inspector.

[Utils.cs]
{% highlight c# %}
public enum Direction { Up, Left, Down, Right, Forward, Back }

// Probably not the best place for this static class. 
public static class EnumUtils
{
    ...
    //Extension method to get the Vector3 based on 
    //the Transform's direction. 
    public static Vector3 Trans(this Direction dir, Transform t)
    {
        switch (dir)
        {
            case Direction.Up:
                return t.up;
            case Direction.Left:
                return t.right * -1;
            case Direction.Down:
                return t.up * -1;
            case Direction.Right:
                return t.right;
            default:
                return t.up;
        }
    }
    ...
{% endhighlight %}

[lift-trigger]:         {{ site.url }}/assets/lift-trigger.gif


[LiftTrigger.cs]:         https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Triggers/LiftTrigger.cs
[Utils.cs]:               https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Utils.cs
