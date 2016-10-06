<template>
    <div class="content-type" v-bind:class="{ 'edit-wrapper': app_edit_mode }">
        <div class="edit-actions-wrapper" v-if="app_edit_mode">
            <a href="#" v-on:click="switchMode">Edit</a> |
            <a href="#">Remove</a>
        </div>

        <div v-show="!edit_mode">
            <p v-if="type == 'text'">
                {{{ content }}}
            </p>
            <div class="code-block" v-if="type == 'code'">
                <p><code>{{{ content }}}</code></p>
            </div><!--//code-block-->

            <div class="code-block" v-if="type == 'code_block'">
                <pre><code class="language-markup" id="1"></code></pre>
            </div><!--//code-block-->
        </div>

        <div v-show="edit_mode" v-if="app_edit_mode">
            <textarea id="editor_{{ tinymce_id }}" rows="8" cols="100" v-model="clean_content" v-if="type === 'code_block'"></textarea>
            <textarea id="editor_{{ tinymce_id }}" rows="8" cols="100" v-model="content" v-if="type !== 'code_block'"></textarea>
            <button type="button" name="button" v-on:click="update()">Update</button>
        </div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        ready () {
            var self = this;
            setTimeout(function() {
                // Trigger things like prism highlighing
                self.updateContent();

                // TODO: Use Ace (https://ace.c9.io/#nav=howto) for the code_block
                // Use tinymce for text blocks
                // Use a single input for one-line code
                self.tinymce = tinymce.init({
                    selector: 'textarea',
                    content_css: '//www.tinymce.com/css/codepen.min.css'
                });
            }, 0);
        },
        props: ['type', 'content', 'id', 'identifier', 'app_edit_mode'],

        data: function() {
            return {
                tinymce_id: 'editor_' + Math.random().toString(36).slice(2),
                clean_content: this.unescapeHtml(this.content),
                edit_mode: false,
                tinymce: null,
            }
        },

        methods: {
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
                var selector = 'editor_' + this.tinymce_id;
                var content = tinymce.editors[selector].getContent();

                if (this.type === 'code_block') {
                    // var clean_content = self.unescapeHtml(this.content);
                    var html = Prism.highlight(this.clean_content, Prism.languages.markup);
                    $(this.$el).find('code').html(html);
                    Prism.highlightElement($('#1')[0]);
                } else if (this.type === 'code') {
                    $(this.$el).find('code').html(this.content);
                } else {
                    // $(this.$el).find('p').html(this.clean_content);
                }
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
