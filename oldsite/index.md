---
layout: default
---
<!-- Section -->
<section>
  <header class="major">
    <h2>Featured Works</h2>
  </header>
  <div class="posts">
  {% for game in site.games %}
    {% unless game.mechanic %}
       {% if game.top3 %}
        <article>
          <a href="{{ game.url }}" class="image"><img src="games/{{ game.title | slugify }}/{{ game.image_dir }}{{ game.icon }}" alt="" /></a>
          <h3>{{ game.title }} <em>{{ game.subtitle | default: "" }}</em></h3>
          <p>{{ game.description }}</p>
          <ul class="actions">
            <li><a href="{{ game.url }}" class="button">More</a></li>
          </ul>
        </article>
      {% endif %}
    {% endunless %}
  {% endfor %}
  </div>
  <div>
    <a href="{{ site.url }}/works" class="button primary small fit">More Works</a>
  </div>
</section>