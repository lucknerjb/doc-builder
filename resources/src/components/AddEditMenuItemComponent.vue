<template>
    <full-modal title="Add / Edit Menu Item" modal-id="add-edit-menu-item" size-class="modal-lg">
        <div class="col-md-9">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label">Label</label>
                    <input type="text" class="form-control" v-model="label">
                </div>

                <div class="form-group">
                    <label class="control-label">Identifier</label>
                    <input type="text" class="form-control" disabled="disabled" v-model="identifier">
                </div>

                <div class="form-group">
                    <label class="control-label">Hash value</label>
                    <input type="text" class="form-control" v-model="location" />
                    <br>
                    <small>
                        This is the value that gets appended to the URL if using the <strong>hash-routing</strong> config option
                        <br>
                        Ex: http://example.com/#<strong>hashValue</strong>
                    </small>
                </div>
            </form>
        </div>

        <div slot="buttons">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary waves-effect waves-light void" v-on:click="save">Save</button>
        </div>
    </full-modal>
</template>

<script>
    import store from '../store'
    import FullModalComponent from './FullModalComponent.vue'

    export default {
        components: {
            'full-modal': FullModalComponent,
        },

        ready () {
        },
        props: ['section_id'],

        data: function() {
            return {
                mode: 'section',
                label: '',
                location: ''
            }
        },

        computed: {
            identifier: function() {
                // TODO: trim this in case there is a trailing space after the label value
                return this.label.replace(/\s+/g, '-').toLowerCase();
            },

            location: function() {
                return this.identifier;
            }
        },

        methods: {
            addNew: function(type) {
                // TODO: Throw into utils
                var id = Math.random().toString(36).slice(2);
                var position = null;

                if (type === 'section') {
                    // var position = this.sections.length;
                    this.sections.push({
                        "id": id,
                        "label": "New Section",
                        "position": position,
                        "sub_sections": []
                    });
                } else {
                    // var position = this.selected_section.sub_sections.length;
                    this.sections.push({
                        "id": id,
                        "label": "New Sub-Section",
                        "position": position
                    });
                }
            },

            save: function() {
                var id = Math.random().toString(36).slice(2);
                var data = {
                    "id": id,
                    "label": this.label,
                    "identifier": this.identifier,
                    "location": this.location
                };

                if (this.section_id === null) { // Adding a section
                    data['sub_sections'] = [];
                    this.$dispatch('sections.add', data);
                } else { // Adding a sub-section
                    this.$dispatch('sub_sections.add', this.section_id, data);
                }
                this.clearForm();
                this.$broadcast('modal.close');
            },

            clearForm: function() {
                this.section_id = null;
                this.label = '';
            },
        }
    }
</script>
