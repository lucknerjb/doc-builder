<template>
    <div class="content-type" v-bind:class="{ 'edit-wrapper': app_edit_mode }">
        <div class="edit-actions-wrapper" v-if="app_edit_mode">
            <a href="#" v-on:click="switchMode">Edit ({{ type }})</a> |
            <a href="#">Remove</a>
        </div>

        <div v-show="!edit_mode">
            <p id="{{ element_id }}" v-if="type == 'text'">
                {{{ content }}}
            </p>
            <div class="code-block" v-if="type == 'code'">
                <p><code id="{{ element_id }}">{{{ content }}}</code></p>
            </div>

            <div class="code-block" v-if="type == 'code_block'">
                <pre><code class="language-markup" id="{{ element_id }}"></code></pre>
            </div>
        </div>

        <!--<div v-show="edit_mode" v-if="app_edit_mode">-->
        <div>
            <textarea id="{{ tinymce_id }}" class="editor" rows="8" cols="100" v-model="clean_content" v-if="type === 'code_block'"></textarea>
            <textarea id="{{ tinymce_id }}" class="editor" rows="8" cols="100" v-model="content" v-if="type !== 'code_block'"></textarea>
            <div id="ace_{{ element_id }}" style="height:250px;">{{ clean_content }}</div>
            <select class="" v-if="type === 'code_block'" v-model="language" v-on:change="set_ace_mode">
                <option v-for="item in prism_languages | orderBy 'label'" value="{{ item.value }}">{{ item.label }}</option>
            </select>
            {{ clean_content }}
            <button type="button" name="button" v-on:click="update()">Update</button>
        </div>
    </div>
</template>

<script>
    import store from '../store'
    import config from '../config.js'

    export default {
        ready () {
            let vm = this
            vm.ace_editor = null
            vm.language = (vm.language.length === 0) ? 'markup' : vm.language

            setTimeout(function() {
                let $element = $('#' + vm.element_id)
                // TODO: Can we avoid duplicating `updateContent()`?
                // Trigger things like prism highlighing
                if (vm.type === 'code_block') {
                    // var clean_content = vm.unescapeHtml(this.content);
                    console.log(vm.clean_content)
                    var html = Prism.highlight(vm.clean_content, Prism.languages[vm.language])
                    // console.log(html)
                    $element.html(html)
                    Prism.highlightElement($element[0])
                } else if (vm.type === 'code') {
                    $element.html(vm.content)
                } else {
                    // $element.html(this.clean_content);
                }

                // Editors
                if (vm.type === 'code_block') {
                    console.log('ace_' + vm.element_id)
                    vm.ace_editor = ace.edit('ace_' + vm.element_id)
                    vm.ace_editor.setTheme("ace/theme/monokai")
                    vm.ace_editor.getSession().setMode("ace/mode/javascript")
                } else {
                    vm.tinymce = tinymce.init({
                        selector: '#ace_' + vm.tinymce_id,
                        content_css: '//www.tinymce.com/css/codepen.min.css'
                    })
                }

                // TODO: Use Ace (https://ace.c9.io/#nav=howto) for the code_block
                // Use tinymce for text blocks
                // Use a single input for one-line code
                // vm.tinymce = tinymce.init({
                //     selector: '#' + vm.tinymce_id,
                //     content_css: '//www.tinymce.com/css/codepen.min.css'
                // });
            }, 500);
        },
        props: {
            type: String,
            content: String,
            id: String,
            identifier: String,
            language: {
                type: String,
                default: 'markup'
            },
            app_edit_mode: Boolean
        },

        data: function() {
            return {
                prism_languages: AppConfig.prism_languages,
                tinymce_id: 'editor_' + Math.random().toString(36).slice(2),
                clean_content: this.unescapeHtml(this.content),
                edit_mode: false,
                tinymce: null,
            }
        },

        computed: {
            element_id: function() {
                return 'content-type-' + this.id
            }
        },

        methods: {
            set_ace_mode: function(event) {
                let value = $(event.target).val()
                this.ace_editor.getSession().setMode("ace/mode/" + value)
            },

            switchMode: function(event) {
                this.edit_mode = !this.edit_mode;
                event.preventDefault();
            },

            escapeHtml: function(unsafe) {
                return $('<div />').text(unsafe).html()
            },

            unescapeHtml: function(safe) {
                return $('<div />').html(safe).text();
            },

            updateContent: function() {
                var content = tinymce.editors[this.tinymce_id].getContent();

                if (this.type === 'code_block') {
                    // var clean_content = vm.unescapeHtml(this.content);
                    var html = Prism.highlight(this.clean_content, Prism.languages.markup);
                    $(this.$el).find('code').html(html);
                    Prism.highlightElement($('#' + this.element_id)[0]);
                } else if (this.type === 'code') {
                    $(this.$el).find('code').html(this.content);
                } else {
                    // $(this.$el).find('p').html(this.clean_content);
                }

                this.content = content
            },

            // TODO: Separate the updating of the various types as we'll need to fetch the new data
            // in a different way based on the editing process used
            update: function() {
                this.updateContent();

                // Trigger event
                this.$dispatch('section.content.updated', this.id, this.identifier, this.content);
                this.$dispatch('app.require_save');

                this.edit_mode = !this.edit_mode;
            }
        }
    }
</script>
