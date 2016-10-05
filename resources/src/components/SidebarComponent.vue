<template>
    <div class="doc-sidebar hidden-xs" v-bind:class="{ 'edit-mode': app_edit_mode }">
        <nav id="doc-nav">
          <ul id="doc-menu" class="nav doc-menu edit-mode" v-if="app_edit_mode">
              <li v-for="section in sections">
                  <a class="scrollto" href="#{{ section.location }}">
                      <span class="drag-handle">&#9776;</span>
                      {{ section.label }}
                  </a>
                  <ul class="nav doc-sub-menu">
                      <li v-for="sub_section in section.sub_sections">
                          <a class="" href="#{{ sub_section.location }}">
                              <span class="drag-handle">&#9776;</span>
                              {{ sub_section.label }}
                          </a>
                      </li>
                      <li>
                          <a class="add-sub-section"
                             href="#"
                             data-toggle="modal"
                             data-target="#add-edit-menu-item"
                             v-on:click="setSectionId(section.id)">Add sub section</a>
                      </li>
                  </ul><!--//nav-->
              </li>
              <li>
                  <a class="add-section"
                     href="#"
                     data-toggle="modal"
                     data-target="#add-edit-menu-item">Add section</a>
              </li>
          </ul>

          <ul id="doc-menu" class="nav doc-menu" data-spy="affix" v-if="!app_edit_mode">
              <li v-for="section in sections">
                  <a class="scrollto" href="#{{ section.location }}">{{ section.label }}</a>
                  <ul class="nav doc-sub-menu" v-if="section.sub_sections.length">
                      <li v-for="sub_section in section.sub_sections">
                        <a class="scrollto" href="#{{ sub_section.location }}">{{ sub_section.label }}</a>
                      </li>
                  </ul><!--//nav-->
              </li>
          </ul><!--//doc-menu-->
      </nav>
      <db-add-edit-menu-item :section_id="modal_section_id"></db-add-edit-menu-item>
  </div><!--//doc-sidebar-->

</template>

<script>
    import store from '../store'
    import AddEditMenuItemComponent from './AddEditMenuItemComponent.vue'

    export default {
        components: {
            'db-add-edit-menu-item': AddEditMenuItemComponent
        },

        ready () {
        },

        data () {
            return {
                modal_section_id: null
            };
        },

        props: ['sections', 'app_edit_mode'],

        methods: {
            setSectionId: function(id) {
                this.modal_section_id = id;
            },

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
