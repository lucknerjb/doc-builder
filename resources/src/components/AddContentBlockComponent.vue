<template>
    <select class="add-content-block"
            v-on:change="addContentBlock(identifier, index, $event)">
        <option value="">Add content block here ({{ index }})</option>
        <option value="text">Text</option>
        <option value="code">Code Line</option>
        <option value="code_block">Code Block</option>
    </select>
</template>

<script>
    import store from '../store'

    export default {
        ready () {},
        props: ['index', 'identifier'],

        data: function() {
            return {
            }
        },

        methods: {
            addContentBlock: function(section_identifier, index, event) {
                // TODO: Can this be done via watch and a data value instead?
                var $target = $(event.target);
                var type = $target.val();
                index++;
                this.$dispatch('add_sub_section', section_identifier, type, index);
                $target.val('');
            }
        }
    }
</script>
