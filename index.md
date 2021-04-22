---
layout: splash
permalink: /
date: 2016-03-23T11:48:41-04:00
intro: 
  - excerpt: 'Hey! I''m **Lesther**!'
feature_row:
  - image_path: assets/images/heavy-is-the-crown-game-icon.png
    alt: "heavy-is-the-crown-game-icon"
    title: "Heavy is the Crown"
    excerpt: "A 2D top down game of heart wrenching resource management"
    url: "https://possumhousegames.com/games/heavy-is-the-crown/"
  - image_path: /assets/images/shot-in-the-dark-cover-image.png
    alt: "shot-in-the-dark-logo"
    title: "Shot in the Dark"
    excerpt: "A 2D pixel platformer set in a black, white, and red world built in the Construct 3 game engine."
    url: "https://possumhousegames.com/games/shot-in-the-dark/"
  - image_path: /assets/images/they-seek-the-lamp-cover-image.png
    alt: "they-seek-the-lamp-cover-image"
    title: "They Seek the Lamp"
    excerpt: "A first person pixel art trek through mysterious woods in search for a way out."
    url: "https://possumhousegames.itch.io/they-seek-the-lamp"


---
<br>

Hey! Currently I'm half of [Possum House Games](https://possumhousegames.com/) acting as the producer and programmer. While I wear more hats than that in the still young studio, my interests and strengths lie primarily in designing and implementing gameplay systems. 

--- 

{% comment %} {% include feature_row %} {% endcomment %}

<!-- # Nine (In Development)
{: .text-center} -->

{% assign game = site.data.games["Nine"] %}

<h1 class="text-center archive__item-title no_toc" itemprop="headline">
    {{ game.name }} <a class="header-link" href="{{ game.links.first.url }}" rel="permalink"><i class="fas fa-link" aria-hidden="true" title="permalink"></i><span class="sr-only">Permalink</span></a>
</h1>

{% include gallery gameid="Nine" caption=game.galleryCaption %}

{{ game.description }}

<!-- # Shot in the Dark
{: .text-center} -->

{% assign game = site.data.games["Shot in the Dark"] %}

<h1 class="text-center archive__item-title no_toc" itemprop="headline">
    {{ game.name }} <a class="header-link" href="{{ game.links.first.url }}" rel="permalink"><i class="fas fa-link" aria-hidden="true" title="permalink"></i><span class="sr-only">Permalink</span></a>
</h1>

{% include gallery gameid=game.name caption=game.galleryCaption %}

{{ game.description }}

<!-- # They Seek the Lamp
{: .text-center} -->

{% assign game = site.data.games["They Seek the Lamp"] %}

<h1 class="text-center archive__item-title no_toc" itemprop="headline">
    {{ game.name }} <a class="header-link" href="{{ game.links.first.url }}" rel="permalink"><i class="fas fa-link" aria-hidden="true" title="permalink"></i><span class="sr-only">Permalink</span></a>
</h1>

{% include gallery gameid=game.name caption=game.galleryCaption %}

{{ game.description }}

<!-- # Heavy is the Crown
{: .text-center} -->

{% assign game = site.data.games["Heavy is the Crown"] %}

<h1 class="text-center archive__item-title no_toc" itemprop="headline">
    {{ game.name }} <a class="header-link" href="{{ game.links.first.url }}" rel="permalink"><i class="fas fa-link" aria-hidden="true" title="permalink"></i><span class="sr-only">Permalink</span></a>
</h1>

{% include gallery gameid=game.name caption=game.galleryCaption %}

{{ game.description }}

<!-- More at: 
{: style="text-align: center;"}

[ITCH.IO](https://kpable.itch.io/){: .btn .btn--inverse .btn--x-large}
{: style="text-align: center;"} -->