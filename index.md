---
layout: default
---
<!-- Section -->
<section>
	<header class="major">
		<h2>Works</h2>
	</header>
	<div class="posts">
		{% for post in site.posts %}
			{% if post.tags contains "project" %}
				<article>
					<a href="{{ post.url }}" class="image"><img src="{{ site.url }}/assets/images/{{post.category}}/{{ post.image }}" alt="" /></a>
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
