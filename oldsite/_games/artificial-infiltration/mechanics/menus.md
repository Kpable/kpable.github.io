---
category: artificial-infiltration
game: artificial-infiltration
fa_icon: fa-navicon
description: |
  Create menus allowing creation and deletion of game save data, game setting modification, and game mode selection.
---

#### Design Challenge

{{ page.description }}

#### Development Considerations

Need to establish a bidirectional link between UI elements, saved data, and current game data. Changes in game data should both be saved and applied, as well as reflected in the UI when the change occurs.

![Menus] [menus]{:class="image fit"}

<!--excerpt_end-->

#### Then and Now Thoughts

> "I need to identify the menu structure to properly set up the navigation. Some of these menu items will need to work with the game's save data. I can use that data to dynamically create some menu items. I also have to be able to delete and create data when the player wants a new game." 
**_- Past Me_**

> "You did well with the data control throughout the menus and the dynamic menus left room for future expansion. However, you didn’t quite make the navigation easy to change when the design changed to exclude or add a menu in the structure. Reconnecting elements in the menu navigation feels like it could be an easier process. We'll figure it out some day."
**_- Present Me_**

#### TL;DR
- Set up basic menu navigation where each button would either change scene or open a sub menu.
- Used object oriented design to abstract out common menu animation and functionality.
- Dynamically created UI elements where possible to allow for future expansion

---

#### Menu Navigation 

I set up the menu system to navigate through as simply as I could think of it at the time. When the player clicks a button to dive deeper into the menus, show the next menu on top of the current menu. When navigating back out through the menus, hide the current menu. 

It was a simple plan of showing and hiding menus stacked on top of one another. However, a design requirement for menu transitions which made things a bit less simple.

#### Menu Transitions

Each menu was designed to have a background image along with the menu content. Both of which would fade in when the menu was opened with the background image fading in prior to the menu content. 

I set up a couple of animations using Unity's animator to fade in and out a UI element and play the animations as part of the "show menu" process:

- Show Background
    - Fade in background
    - Wait until fade complete
- Show Content
    - Fade in content
    - Wait until fade complete

[MenuController.cs]
{% highlight c# %}
public void ShowBackgroundImage()
{
    StartCoroutine("EnableMenuItem", backgroundImage);
}
...
public void ShowMenuPanel()
{
    StartCoroutine("EnableMenuItem", menuPanel);
}
...
IEnumerator EnableMenuItem(GameObject menuItem)
{
    if(!menuActive) menuActive = true;
    yield return new WaitForSecondsRealtime(0);
    menuItem.SetActive(true);
    menuItem.GetComponent<Animator>().speed = fadeSpeed;
    menuItem.GetComponent<Animator>().Play("FadeIn");
}
...
{% endhighlight %}


The process reversed for navigating back up the menu tree:

- Hide Content
    - Fade out content
    - Wait until fade complete
- Hide Background
    - Fade out background
    - Wait until fade complete

[MenuController.cs]
{% highlight c# %}
public void HideMenuPanel()
{
    StartCoroutine("DisableMenuItem", menuPanel);
}
...
public void HideBackgroundImage()
{
    StartCoroutine("DisableMenuItem", backgroundImage);
}
...
IEnumerator DisableMenuItem(GameObject menuItem)
{
    menuItem.GetComponent<Animator>().speed = fadeSpeed;
    menuItem.GetComponent<Animator>().Play("FadeOut");

    // Wait for the fade to actually finish before 
    // disabling the object.
    yield return new WaitForSecondsRealtime(fadeDuration); 

    menuItem.SetActive(false);
    if(menuItem == backgroundImage) menuActive = false;
}
...
{% endhighlight %}

When the player clicks on a menu button, that button will navigate to the new menu using this method. 

#### Main Menu

![Main Menu] [main-menu]{:class="image fit"}

Most of the menu items on this menu primarily behave as previously mentioned with regard to navigation. 

The Load Game button however must transition from the menu to the game and parse the player's saved data to load the next available mission. 

[MainMenuController.cs]
{% highlight c# %}
public void LoadGame()
{
    int nextMission = 0;
    for (int i = 1; i < (int)Missions.Total; i++)
    {
        if (!gameManager.playerSaveGame.missionData[i - 1].completed)
        {
            // If this is the first mission and it is 
            // not yet completed
            if (i == 1) nextMission = i;
            // If mission not completed and this is 
            // not the first mission. 
            else if (i > 1)
                // If this mission is unlocked and the 
                // previous mission is completed
                if (gameManager.playerSaveGame.
                        missionData[i - 1].unlocked &&
                    gameManager.playerSaveGame
                        .missionData[i - 2].completed)
                {
                    nextMission = i;
                }
        }
    }
    ...
}
{% endhighlight %}

#### New Game Menu

![New Game Menu] [new-game-menu]{:class="image fit"}

This confirmation menu verifies whether new save data should be created or not. This would delete the previous saved game and create a new one with default values. 

#### Mission Runner Menu

![Mission Runner Menu] [mission-runner-menu]{:class="image fit"}

When the game is started, this menu is populated with button elements for each mission available and adjusted to reflect the data that was stored regarding those missions.

[MissionRunnerMenuController.cs]
{% highlight c# %}
protected override void Start()
{
    base.Start();
    ...
    playerSavedData = gameManager.playerSaveGame;

    // Mission Runner Buttons
    for (int i = 1; i < (int)Missions.Total; i++)
    {
        // Create a new mission runner button. 
        GameObject btn = 
            Instantiate(missionRunnerMissionButtonPrefab) 
                as GameObject;
        
        // Set its parent to be the panel, 
        // false to disable world position and get canvas position. 
        btn.transform.SetParent(missionRunnerItemParent, false);
        
        // Find the Button's Text to set it to the mission name. 
        btn.transform.Find("Mission Button")
            .GetComponentInChildren<Text>().text =
                ((Missions)i).ToString().Replace("_", " ");
        
        // Grab the time score text and set that to this 
        // mission's best time. 
        btn.transform.Find("Best Time").GetComponent<Text>().text =
            playerSavedData.missionData[i - 1].levelTime.PrettyTime();

        // If mission is locked in campaign, 
        // lock it in Mission Runner mode. 
        if (!playerSavedData.missionData[i - 1].unlocked)
        {
            btn.transform.Find("Mission Button")
                .GetComponentInChildren<Button>()
                .interactable = false;
        }
        ...
    }
}
{% endhighlight %}

#### Options Menu

![Option Menu] [option-menu]{:class="image fit"}

Each of the elements in the options menu had to be capable of changing the current game settings to provide the player with a preview of the selected changes. Additionally, should the player choose to save the selected settings the changed values should be captured and saved so they may remain persistent each time the game loaded up. Alternatively, should the player change their mind and want to discard the changes, the previously saved settings should be restored.

To accomplish this I needed to create a link between the UI element, the current game setting, and a temporary copy of the settings struct that is saved off to avoid making modifications to the existing settings in the event the player discards the changes. 

To first reflect the current game settings, whether previously modified or defaults set on game initialization, I retrieved the saved game settings struct and set each element to the value that was read from file.

[OptionsMenuController.cs]
{% highlight c# %}
public void LoadGameSettings()
{
    gameSettings = new GameSettings(gameManager.gameSettings);

    // Adjust all UI Elements to show the current settings. 
    ...
    textureQualityDropdown.value = gameSettings.textureQuality;
    ...
}
{% endhighlight %}

Once the UI elements are set, I add a listener to the element for when the value changes and use that listener to set both the current game settings and the temporary game settings struct.

[OptionsMenuController.cs]
{% highlight c# %}
protected override void Start()
{
    base.Start();
    ...
    textureQualityDropdown.onValueChanged
        .AddListener(delegate { TextureQuality(); });
    ...
}
...
public void TextureQuality()
{
    QualitySettings.masterTextureLimit = 
        gameSettings.textureQuality = 
            textureQualityDropdown.value;
}
{% endhighlight %}

If the player chooses to save the selected settings, I update the saved file and the existing game settings struct with the new values and exit the menu.

[OptionsMenuController.cs]
{% highlight c# %}
public void Save()
{
    // Save the Settings
    GameData.SaveJson(Utils.GameSettingsFilename, 
                        JsonUtility.ToJson(gameSettings, true));
    //Update the Game Manager of the new settings. 
    gameManager.gameSettings = new GameSettings(gameSettings);
    ...
    Back();
}
{% endhighlight %}

Should the player wish to discard the changes, the temporary settings are checked against the existing settings and if any changes are detected all the settings are restored to the previously stored existing settings before the menu is closed.

[OptionsMenuController.cs]
{% highlight c# %}
protected override void Back()
{
    // IF the settings are being discarded, 
    // reset them before closing the menu. 
    if (gameSettings != gameManager.gameSettings)
    {
        ResetSettings();
    }
    
    base.Back();
}

public void ResetSettings()
{
    LoadGameSettings();
    ...
    QualitySettings.masterTextureLimit = 
        gameSettings.textureQuality;
    ...
}
{% endhighlight %}

#### Pause Menu

![Pause Menu] [pause-menu]{:class="image fit"}

The pause menu is a simple menu that pauses the game allowing the player to change settings, restart or return to the main menu.

#### Player Customization Menu

![Player Customization Default] [player-customization-1]{:class="image fit"}

![Player Customization Shard] [player-customization-2]{:class="image fit"}

The player customization menu enables the player to choose a skin for the player avatar. The selections are previewed, saved, and discarded similarly to the way other game settings are.

{% highlight c# %}

{% endhighlight %}

[menus]:                    {{ site.url }}/assets/images/artificial-infiltration/menus.gif
[main-menu]:                {{ site.url }}/assets/images/artificial-infiltration/main-menu.png
[mission-runner-menu]:      {{ site.url }}/assets/images/artificial-infiltration/mission-runner-menu.png
[mission-select-menu]:      {{ site.url }}/assets/images/artificial-infiltration/mission-select-menu.png
[new-game-menu]:            {{ site.url }}/assets/images/artificial-infiltration/new-game-menu.png
[option-menu]:              {{ site.url }}/assets/images/artificial-infiltration/options-menu.png
[pause-menu]:               {{ site.url }}/assets/images/artificial-infiltration/pause-menu.png
[player-customization-1]:   {{ site.url }}/assets/images/artificial-infiltration/player-customization-1.png
[player-customization-2]:   {{ site.url }}/assets/images/artificial-infiltration/player-customization-2.png

[MenuController.cs]:       https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/UI/MenuController.cs
[MainMenuController.cs]:       https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/UI/MainMenuController.
[OptionsMenuController.cs]:       https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/UI/OptionsMenuController.cs
[MissionRunnerMenuController.cs]: https://github.com/Kpable/Artificial-Infiltration/blob/master/Scripts/UI/MissionRunnerMenuController.cs