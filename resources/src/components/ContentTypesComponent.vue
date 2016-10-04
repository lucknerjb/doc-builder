<template>
    <div class="content-type edit-wrapper" style="position: relative; padding-top: 40px;">
        <div class="edit-actions-wrapper" style="position: absolute; right: 10px; top: 10px;">
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

        <div v-show="edit_mode">
            <textarea rows="8" cols="100" v-model="content"></textarea>
            <button type="button" name="button" v-on:click="update()">Update</button>
        </div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        ready () {
            if (this.type === 'code_block') {
                var self = this;
                setTimeout(function() {
                    var clean_content = self.unescapeHtml(self.content);
                    var html = Prism.highlight(clean_content, Prism.languages.markup);
                    $('#1').html(html);
                    $('#ta').val(clean_content);
                }, 0)
            }
        },
        props: ['type', 'content'],

        data: function() {
            return {
                clean_content: this.unescapeHtml(this.content),
                edit_mode: false,
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

            update: function() {
                if (this.type === 'code_block') {
                    var html = Prism.highlight(this.clean_content, Prism.languages.markup);
                    $(this.$el).find('code').html(html);
                    Prism.highlightElement($('#1')[0]);
                } else if (this.type === 'code') {
                    $(this.$el).find('code').html(this.content);
                } else {
                    // $(this.$el).find('p').html(this.clean_content);
                }

                this.edit_mode = !this.edit_mode
            }
        }
    }
</script>
