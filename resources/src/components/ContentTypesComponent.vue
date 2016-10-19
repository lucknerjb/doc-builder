<template>
    <div class="content-type" v-bind:class="{ 'edit-wrapper': app_edit_mode }">
        <div class="edit-actions-wrapper" v-if="app_edit_mode">
            <a href="#" v-on:click="switchMode">Edit ({{ type }})</a> |
            <a href="#">Remove</a>
        </div>

        <div v-show="!edit_mode">
            <p id="{{ element_id }}" class="preview-model-content" v-if="type == 'text'">
                {{{ content }}}
            </p>
            <div class="code-block" v-if="type == 'code'">
                <p><code class="preview-model-content" id="{{ element_id }}">{{{ content }}}</code></p>
            </div>

            <div class="code-block" v-if="type == 'code_block'">
                <pre><code class="preview-model-content" id="{{ element_id }}"></code></pre>
            </div>
        </div>

        <div v-show="edit_mode" v-if="app_edit_mode">
            <textarea id="{{ tinymce_editor_id }}" class="editor" rows="8" cols="100" v-model="content" v-if="type !== 'code_block'"></textarea>
            <div id="{{ ace_editor_id }}" class="editor" v-if="type === 'code_block'" style="height:250px;">{{ clean_content }}</div>
            <select class="" v-if="type === 'code_block'" v-model="language" v-on:change="set_ace_mode">
                <option v-for="item in ace_editor_modes | orderBy 'label'" value="{{ item.value.toLowerCase() }}">{{ item.label }}</option>
            </select>
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
                    vm.language = (vm.language.length === 0) ? vm.default_language : vm.language
                    vm.ace_editor = ace.edit(vm.ace_editor_id)
                    vm.ace_editor.setTheme("ace/theme/monokai")
                    vm.ace_editor.getSession().setMode("ace/mode/" + vm.language)
                } else {
                    vm.tinymce = tinymce.init({
                        selector: '#' + vm.tinymce_editor_id,
                        content_css: '//www.tinymce.com/css/codepen.min.css'
                    })
                }

                // TODO: Use Ace (https://ace.c9.io/#nav=howto) for the code_block
                // Use tinymce for text blocks
                // Use a single input for one-line code
                // vm.tinymce = tinymce.init({
                //     selector: '#' + vm.tinymce_editor_id,
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
                default: 'html'
            },
            app_edit_mode: Boolean
        },

        data: function() {
            return {
                new_content: '',
                default_language: 'html',
                ace_editor_modes: AppConfig.ace_editor_modes,
                clean_content: this.unescapeHtml(this.content),
                edit_mode: false,
                tinymce: null,
            }
        },

        computed: {
            element_id: function() {
                return 'content-type-' + this.id
            },

            ace_editor_id: function() {
                return 'ace_editor_' + this.id
            },

            tinymce_editor_id: function() {
                return 'tinymce_editor_' + this.id
            },
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
                if (this.type === 'code_block') {
                    let content = this.ace_editor.session.getValue()

                    // TODO: Why can't we just update the prop `content` here???
                    this.new_content = this.escapeHtml(content)

                    // TODO: Need to match up Prism languages with Ace editor modes
                    var html = Prism.highlight(content, Prism.languages[this.language]);
                    $(this.$el).find('.preview-model-content').html(html);
                    Prism.highlightElement($('#' + this.element_id)[0]);
                } else if (this.type === 'code') {
                    var content = tinymce.editors[this.tinymce_editor_id].getContent();
                    this.new_content = this.escapeHtml(content)

                    $(this.$el).find('.preview-model-content').html(content);
                } else {
                    var content = tinymce.editors[this.tinymce_editor_id].getContent();
                    this.new_content = content

                    $(this.$el).find('.preview-model-content').html(content);
                }
            },

            // TODO: Separate the updating of the various types as we'll need to fetch the new data
            // in a different way based on the editing process used
            update: function() {
                this.updateContent()
                console.log(this.new_content)

                // Trigger event
                this.$dispatch('section.content.updated', this.id, this.identifier, this.new_content)
                this.$dispatch('app.require_save')

                this.edit_mode = !this.edit_mode
            }
        }
    }
</script>
