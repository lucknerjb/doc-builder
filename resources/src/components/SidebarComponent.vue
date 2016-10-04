<template>
  <div class="doc-sidebar hidden-xs">
      <nav id="doc-nav">
          <ul id="doc-menu" class="nav doc-menu" data-spy="affix">
              <li v-for="section in sections">
                  <a class="scrollto" href="#{{ section.location }}">{{ section.label }}</a>
                  <ul class="nav doc-sub-menu" v-if="section.sub_sections.length">
                      <li v-for="sub_section in section.sub_sections">
                        <a class="scrollto" href="#{{ sub_section.location }}">{{ sub_section.label }}</a>
                      </li>
                  </ul><!--//nav-->
              </li>
              <li>
                <button type="button" name="button" v-on:click="addSection">Edit Sections</button>
              </li>
          </ul><!--//doc-menu-->
      </nav>
  </div><!--//doc-sidebar-->

</template>

<script>
    import store from '../store'
    export default {
        ready () {
        },
        props: ['sections'],
        methods: {
          addSection: function(event) {
            console.log('in addSection 123')
            event.preventDefault();
            var sections_length = this.sections.length;
            this.sections.push({
              "label": "Methods",
              "position": sections_length,
              "sub_sections": []
            });
          }
        }
    }
</script>
