---
layout: default
---
<!-- Section -->
<!--  
<section>
  <header class="major">
    <h2>Works</h2>
  </header>
  <div class="posts">
    {% for post in site.posts %}
      {% if post.tags contains "project" %}
        <article>
          <a href="{{ post.url }}" class="image"><img src="{{ site.url }}/assets/images/{{post.category}}/{{ post.image }}" alt="" /></a>
          <a href="{{ post.url }}" class="image"><img src="{{ post.url  | remove: 'index.html' }}/images/{{ post.image }}" alt="" /></a>
          <h3>{{ post.title }} <em>{{ post.subtitle | default: "" }}</em></h3>
          <p>{{ post.description }}</p>
          <ul class="actions">
            <li><a href="{{ post.url }}" class="button">More</a></li>
          </ul>
        </article>
      {% endif %}
    {% endfor %}
  </div>
</section>
-->
<!-- Section -->
<!--  

<section>
  <header class="major">
    <h2>Works</h2>
  </header>
  <div class="posts">
  {% for game in site.data.games %}
  {% assign dalink= site.url | append: "/assets/games/" | append: game.name | append: "/" | append: game.name | append: ".md" %}
    <article>
      <a href="{{ dalink }}" class="image"><img src="{{ site.url }}/assets/games/{{game.name}}/images/{{ game.image }}" alt="" /></a>
      <h3>{{ game.title }} <em>{{ game.subtitle | default: "" }}</em></h3>
      <p>{{ game.description }} <br>{{ dalink }} </p>
      <ul class="actions">
        <li><a href="{{ site.url }}/_data/{{game.name}}.md" class="button">More</a></li>
      </ul>
    </article>
  {% endfor %}
  </div>
</section>
-->
<!-- Section -->
<section>
  <header class="major">
    <h2>Works</h2>
  </header>
  <div class="posts">
  {% for game in site.games %}
    {% unless game.mechanic %}
      <article>
        <a href="{{ game.url }}" class="image"><img src="games/{{ game.title | slugify }}/{{ game.image_dir }}{{ game.icon }}" alt="" /></a>
        <h3>{{ game.title }} <em>{{ game.subtitle | default: "" }}</em></h3>
        <p>{{ game.description }}</p>
        <!--
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
</section>