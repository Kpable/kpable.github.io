---
category: close-of-business
fa_icon: fa-pause
description: |
  Pause the game to allow the player to either change settings, restart, or quit. 
game: close-of-business
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

There's not much to explain here, Past Me pretty much covered it. The biggest challenge for me was discovering the way to stop gameplay but still allow time to flow so that animations can play. In my search I found a method that would wait for real time seconds to go by instead of game time. In later updates, Unity also included an unscaled time setting in the animations themselves which would also accomplish what I was seeking here. 

Aside from that, minor additions were made to include sound effects and the fun discovery of not having a mouse cursor when you are playing the game and needing one when you are in menus. 

[PauseMenuController.cs]
{% highlight c# %}
...
public IEnumerator PauseGame()
{
    AudioClip clip = null;
    if (!menuPanel.activeInHierarchy)
    {
        // Play pause on Sound effect
        clip = SoundManager.instance.GetSoundEffect("Pause On");
        if (clip != null)
            audioSource.PlayOneShot(clip);

        // Open the pause menu
        Utils.StopTime();
        ShowBackgroundImage();
        yield return new WaitForSecondsRealtime(fadeDuration);
        ShowMenuPanel();

        // Show Cursor
        Cursor.visible = true;

    }
    else
    {
        // Play pause off sound effect
        clip = SoundManager.instance.GetSoundEffect("Pause Off");
        if (clip != null)
            audioSource.PlayOneShot(clip);

        // Close the pause menu
        HideMenuPanel();
        yield return new WaitForSecondsRealtime(fadeDuration);
        HideBackgroundImage();
        yield return new WaitForSecondsRealtime(fadeDuration);
        Utils.StartTime();

        // Hide cursor again
        Cursor.visible = false;

    }
}
...
{% endhighlight %}

With the time stop being a setting of the time scale.

[Utils.cs]
{% highlight c# %}
...
public static void StopTime()
{
    Time.timeScale = 0;
}

public static void StartTime()
{
    Time.timeScale = 1;
}
...
{% endhighlight %}


[pause]: {{ site.url }}/assets/images/artificial-infiltration/pause.gif

[PauseMenuController.cs]:		https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/UI/PauseMenuController.cs
[Utils.cs]:                 https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/Utils.cs