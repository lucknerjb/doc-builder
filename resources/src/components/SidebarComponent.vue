<template>
    <db-edit-sections :sections="sections"></db-edit-sections>
    <div class="doc-sidebar hidden-xs" style="position:absolute; top: 15px;">
        <nav id="doc-nav">
          <ul id="doc-menu" class="nav doc-menu edit-mode" v-show="app_edit_mode">
              <li v-for="section in sections">
                  <a class="scrollto" href="#{{ section.location }}">{{ section.label }}</a>
                  <ul class="nav doc-sub-menu" v-if="section.sub_sections.length">
                      <li v-for="sub_section in section.sub_sections">
                          <a class="" href="#{{ sub_section.location }}">{{ sub_section.label }}</a>
                      </li>
                  </ul><!--//nav-->
              </li>
              <li>
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#edit-sections-menu">Edit Sections</button>
              </li>
          </ul>

          <ul id="doc-menu" class="nav doc-menu" data-spy="affix" v-show="!app_edit_mode">
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
    import EditSectionsComponent from './EditSectionsComponent.vue'

    export default {
        components: {
            'db-edit-sections': EditSectionsComponent
        },

        ready () {
        },

        props: ['sections', 'app_edit_mode'],

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
