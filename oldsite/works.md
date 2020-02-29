---
layout: headless
---
<!-- Section -->
<section>
  <header class="major">
    <h2>Works</h2>
  </header>
  <div class="posts">
  {% for game in site.games %}
    {% unless game.mechanic %}
        <article>
          <a href="{{ game.url }}" class="image"><img src="{{ site.url }}/games/{{ game.title | slugify }}/{{ game.image_dir }}{{ game.icon }}" alt="" /></a>
          <h3>{{ game.title }} <em>{{ game.subtitle | default: "" }}</em></h3>
          <p>{{ game.description }}</p>
          <ul class="actions">
            <li><a href="{{ game.url }}" class="button">More</a></li>
          </ul>
        </article>
    {% endunless %}
  {% endfor %}
  </div>
</section>