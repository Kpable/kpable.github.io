---
layout: page
title: 100daysform
---

<!-- Form -->
<h3>Log</h3>
<div class="row">
  <div class="2u">
    <input type="text" name="day-number" id="day-number" value="" placeholder="Day Number" />
  </div>
  <div class="10u">
    <input type="text" name="title" id="title" value="" placeholder="Title" />
  </div>

  <div class="12u">
    <input type="date" name="date" id="date" value="" placeholder="{{ site.time | date: '%y' }}" />
  </div>

  <div class="12u">
    <textarea name="thoughts" id="thoughts" placeholder="Thoughts" rows="6"></textarea>
  </div>

  <h3>Examples</h3>
  <div id="examples" class="12u">
    <div id="example-group1" class="row">
      <div class="4u">
        <input type="text" name="example-name" id="example-name" value="" placeholder="example-name" />
      </div>
      <div class="7u">
        <input type="url" name="link" id="link" value="" placeholder="link" />
      </div>
      <div class="1u">
        <div id="remove-example-group" class="button icon fa-minus ">  </div>
      </div>
    </div>
    <div class="1u">
      <div id="new-example-button" class="button icon fa-plus ">  </div>
    </div>
  </div>

  <h3>Links To Work</h3>
  <div id="links" class="12u" >
    <div id="link-group1" class="row">
      <div class="4u">
        <input type="text" name="link-name" id="link-name" value="" placeholder="link-name" />
      </div>
      <div class="7u">
        <input type="url" name="link" id="link" value="" placeholder="link" />
      </div>
      <div class="1u">
        <div class="button icon fa-minus ">  </div>
      </div>
    </div>
    <div class="1u">
      <div id="new-link-button" class="button icon fa-plus ">  </div>
    </div>
  </div>

  <div id="generate" class="button 12u"> Generate </div>

</div>

