<template>
  <div class="page-wrapper">
      <!-- ******Header****** -->
      <db-header :title="title" :app_edit_mode="app_edit_mode" :needs_saving="needs_saving"></db-header>
      <div class="doc-wrapper">
          <div class="container">
              <div id="doc-header" class="doc-header text-center">
                  <!-- TODO: Change icon -->
                  <h1 class="doc-title"><i class="icon fa fa-paper-plane"></i>{{ header }}</h1>
                  <div class="meta">{{ one_liner }}</div>
              </div><!--//doc-header-->
              <div class="doc-body">
                  <db-content :section_content="section_content" :sections="sections" :app_edit_mode="app_edit_mode"></db-content>
                  <db-sidebar :sections="sections" :app_edit_mode="app_edit_mode"></db-sidebar>
              </div><!--//doc-body-->
          </div><!--//container-->
      </div><!--//doc-wrapper-->

  </div><!--//page-wrapper-->
</template>

<script>
    import Vue from 'vue'
    import store from './store'
    import AuthService from './services/AuthService.js'
    import HeaderComponent from './components/HeaderComponent.vue'
    import SidebarComponent from './components/SidebarComponent.vue'
    import ContentComponent from './components/ContentComponent.vue'

    export default {
        components: {
            'db-header': HeaderComponent,
            'db-sidebar': SidebarComponent,
            'db-content': ContentComponent
        },
        ready () {
            // Disable forms that should be disabled
            $(document).on('submit', 'form.nosubmit', function(evt) {
                evt.preventDefault();
                return false;
            });

            // Buttons / Links with no click event processing
            $(document).on('click', '.void', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
            });

            // For dev mainly. Remove the modal backdrop on dom partial reloads
            $(document).on('click', '.modal-backdrop', function(evt) {
                $(this).remove();
            });
        },

        events: {
            'app.save': function() {
                this.save();
            },

            'app.require_save': function() {
                this.needs_saving = true;
            },

            'app.edit_mode.toggle': function() {
                this.app_edit_mode = !this.app_edit_mode;

                // Reset the sidebar
                setTimeout(function() {
                    if (!this.app_edit_mode) {
                        resetSidebar();
                    }
                }, 0);
            },

            'content.add': function(section_identifier, type, index) {
                // TODO: Throw into utils
                var id = Math.random().toString(36).slice(2);
                var obj = {
                    "id": id,
                    "type": type,
                    "content": "test",
                    "language": "markup", // TODO: Find a way to get this from the user for type code_block
                    "position": index
                };

                if (!this.section_content[section_identifier]) {
                    // TODO: This should work in vue 2.0
                    // this.$set(this.section_content, section_identifier, [obj]);

                    Vue.set(this.section_content, section_identifier, [obj]);
                } else {
                    this.section_content[section_identifier].splice(index, 0, obj);
                }
            },

            'sections.add': function(data) {
                this.sections.push(data);
            },

            'sub_sections.add': function(section_id, data) {
                for (var i = 0; i < this.sections.length; i++) {
                    if (this.sections[i].id === section_id) {
                        this.sections[i].sub_sections.push(data);
                        break;
                    }
                }
            },

            'section.content.updated': function(id, section_identifier, content) {
                var found = false;
                for (var i = 0; i < this.section_content[section_identifier].length; i++) {
                    if (this.section_content[section_identifier][i].id === id) {
                        this.section_content[section_identifier][i].content = content;
                        found = true;
                        break;
                    }
                }
            }
        },

        data: function() {
            return {
                needs_saving: false,
                app_edit_mode: true,
                title: app_data.title,
                header: app_data.header,
                one_liner: app_data.one_liner,
                sections: app_data.sections,
                section_content: app_data.content
            }
        },

        methods: {
            // TODO: Add a way to get the json data if the app crashes
            // - access via window object or save in local storage
            save: function() {
                var self = this;
                var post_data = {
                    'sections': this.sections,
                    'content': this.section_content
                };

                $.ajax({
                    url: '/data',
                    type: 'post',
                    data: JSON.stringify(post_data),
                    contentType:"application/json; charset=utf-8",
                    dataType:"json",
                    success: function(response) {
                        // TODO: Replace with proper alert box
                        alert('Changes saved successfully!');
                        self.needs_saving = false;
                    },
                    error: function(response) {
                        // TODO: Replace with proper alert box
                        alert('There was an error saving your changes. Please try again');
                    }
                });
            }
        }
    }
</script>
