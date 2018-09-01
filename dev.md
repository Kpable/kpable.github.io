---
layout: default
---
<!-- Section -->
<section>
  <header class="major">
    <h2>Works</h2>
  </header>
  <div class="posts">
  {% assign games = site.games | sort: 'date' | reversed %}
  {% for game in games %}
    {% unless game.mechanic %}
        <article>
          <a href="{{ game.url }}" class="image"><img src="games/{{ game.title | slugify }}/{{ game.image_dir }}{{ game.icon }}" alt="" /></a>
          <h3>{{ game.title }} <em>{{ game.subtitle | default: "" }}</em></h3>
          <!--
          {% for tag in game.tags %}
            <span class="button small">{{ tag }}</span>
          {% endfor %}
          -->
          <p>{{ game.description }}</p>
          <!--
          <br> date: {{ game.date }}
          <br> name: {{ game.name }}
          <br> dir: {{ game.directory }}
          <br> col dir: {{ site.games.directory }}
          <br> path: {{ game.path }}
          <br> col path: {{ site.games.path }}
          <br> collection: {{ game.collection }}
          <br> relative_path: {{ game.relative_path }}
          <br> url: {{ game.url }}
          <br> relative_dir: {{ game.relative_directory }}
          {% for file in site.games %}
          <br> file: {{ file.name }}
          <br> path: {{ file.path }}
          {% endfor %}
          -->
          <ul class="actions">
            <li><a href="{{ game.url }}" class="button">More</a></li>
          </ul>
        </article>
    {% endunless %}
  {% endfor %}
  </div>
<!-- 
  <br>
  
  <div class="row"> 
    <div class="6u 12u$(small)">
      <ul class="actions">
        <li><a href="{{ game.url }}" class="button special fit">See More</a></li>
      </ul>
    </div>
  </div> -->
</section>