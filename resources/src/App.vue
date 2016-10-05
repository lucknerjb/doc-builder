<template>
  <div class="page-wrapper">
      <!-- ******Header****** -->
      <db-header :title="title" :app_edit_mode="app_edit_mode"></db-header>
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
            'app.edit_mode.toggle': function() {
                this.app_edit_mode = !this.app_edit_mode;

                // Reset the sidebar
                setTimeout(function() {
                    if (!this.app_edit_mode) {
                        resetSidebar();
                    }
                }, 0);
            },

            'add_sub_section': function(section_identifier, type, index) {
                // TODO: Throw into utils
                var id = Math.random().toString(36).slice(2);
                var obj = {
                    "id": id,
                    "type": type,
                    "content": "test",
                    "position": index
                };;

                this.section_content[section_identifier].splice(index, 0, obj);
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
                        console.log('found')
                        this.section_content[section_identifier][i].content = content;
                        found = true;
                        break;
                    }
                }

                this.save();
            }
        },

        data: function() {
            return {
                app_edit_mode: false,
                title: app_data.title,
                header: app_data.header,
                one_liner: app_data.one_liner,
                sections: app_data.sections,
                section_content: app_data.content,

//                 sections: [
//                   {
//                     "id": 'i8d0ad9kww64j9k9',
//                     "label": "Installation",
//                     "identifier": "installation",
//                     "position": 0,
//                     "location": "installation",
//                     "sub_sections": [
//                       {
//                         "id": 'dcblr6m2rlqe61or',
//                         "position": 0,
//                         "label": "Browser",
//                         "identifier": "browser",
//                         "location": "install-browser"
//                       },
//                       {
//                         "id": '5m3bobkrr7eyu8fr',
//                         "position": 1,
//                         "label": "Bower",
//                         "identifier": "bower",
//                         "location": "install-bower"
//                       },
//                       {
//                         "id": 'iflneice849dlsor',
//                         "position": 2,
//                         "label": "NPM",
//                         "identifier": "npm",
//                         "location": "install-npm"
//                       }
//                     ]
//                   },
//                   {
//                     "id": 'u17wt9j4z6apds4i',
//                     "label": "Options",
//                     "position": 1,
//                     "identifier": "options",
//                     "sub_sections": []
//                   }
//                 ],
//                 section_content: {
//                     "installation": [
//                         {
//                             "id": "igggmcos1abawchy",
//                             "position": 0,
//                             "type": "text",
//                             "content": "Test content"
//                         },
//                     ],
//                     "browser": [
//                         {
//                             "id": "igggmcos1abawcdi",
//                             "position": 0,
//                             "type": "text",
//                             "content": "Bootstrap TagsInput is available on <a href=\"https://cdnjs.com/libraries/bootstrap-tagsinput\">cdnjs.com</a>"
//                         },
//                         {
//                             "id": "xbrfujiksksm7vi",
//                             "position": 1,
//                             "type": "code",
//                             "content": "bower install --save bootstrap-tagsinput"
//                         },
//                         {
//                             "id": "5gisa8t9syrxusor",
//                             "position": 2,
//                             "type": "code_block",
//                             "content": "&#x3C;style media=&#x22;screen&#x22; href=&#x22;bootstrap-tagsinput.css&#x22;&#x3E;&#x3C;/style&#x3E;\n\
// &#x3C;script src=&#x22;bootstrap-tagsinput.js&#x22;&#x3E;&#x3C;/script&#x3E;\n\
// &#x3C;script&#x3E;\n\
//     $(&#x27;.tags&#x27;).tagsinput();\n\
// &#x3C;/script&#x3E;"
//                         }
//                     ]
//                 },
            }
        },

        methods: {
            save: function() {
                // Save
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
                        console.log(response);
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });
            }
        }
    }
</script>
