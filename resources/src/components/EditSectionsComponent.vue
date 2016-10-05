<template>
    <full-modal title="Edit Sections Menu" modal-id="edit-sections-menu" size-class="modal-lg">
        <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" v-for="section in sections" v-bind:class="{ 'active': isCurrentSection(section.id) }">
                    <a href="#" v-on:click="selectSection(section.id, $event)">{{ section.label }}</a>
                    <ul>
                        <li v-for="sub_section in section.sub_sections">
                            <a href="#" v-on:click="selectSubSection(sub_section.id, $event)">{{ sub_section.label }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

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

                <div class="form-group">
                    <div class="col-md-6" style="padding-left:0;">
                        <label class="control-label">Location</label>
                        <select class="form-control">
                            <option value="first">First</option>
                            <option value="before" v-show="showBeforeOption()">Before</option>
                            <option value="after" v-show="showAfterOption()">After</option>
                            <option value="last">Last</option>
                        </select>
                    </div>

                    <div class="col-md-6" v-show="show_sub_sections()">
                        <label class="control-label">&nbsp;</label>
                        <select class="form-control">
                            <option v-for="sub_section in selected_section.sub_sections"
                                    value="{{ sub_section.id }}">{{ sub_section.label }}</option>
                        </select>
                    </div>

                    <div class="col-md-6" v-show="show_sections()">
                        <label class="control-label">&nbsp;</label>
                        <select class="form-control">
                            <option v-for="section in remaining_sections"
                                    value="{{ section.id }}">{{ section.label }}</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>

        <div slot="buttons">
            <button type="button" class="btn btn-info waves-effect pull-left" v-on:click="addNew('section')">New Section</button>
            <button type="button" class="btn btn-info waves-effect pull-left" v-on:click="addNew('sub_section')">New Sub-Section</button>
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary waves-effect waves-light void" v-on:click="save(true)">Save & Continue</button>
            <button type="button" class="btn btn-primary waves-effect waves-light void" v-on:click="save(false)">Save</button>
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
            if (this.sections.length) {
                var section_id = this.sections[0].id;
                this.selectSection(section_id);
            }
        },
        props: ['sections'],

        data: function() {
            return {
                show_sections_flag: true,
                show_sub_sections_flag: true,
                mode: 'section',
                selected_section: {},
                selected_section_id: '',
                selected_subsection: '',
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
            },

            remaining_sections: function() {
                var sections = [];
                for (var i = 0; i < this.sections.length; i++) {
                    if (this.sections[i].id === this.selected_section.id) {
                        continue;
                    }
                    sections.push(this.sections[i]);
                }
                return sections;
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
            },

            show_sections: function() {
                return (this.show_sections_flag && this.mode === 'section');
            },

            show_sub_sections: function() {
                return (this.show_sub_sections_flag && this.mode === 'sub_sections');
            },

            showBeforeOption: function() {
                return (this.remaining_sections.length > 1);
            },

            showAfterOption: function() {
                return (this.remaining_sections.length > 1);
            },

            isCurrentSection: function(expected_id) {
                return (expected_id === this.selected_section.id);
            },

            selectSection: function(id) {
                var section;
                for (var i = 0; i < this.sections.length; i++) {
                    if (this.sections[i].id === id) {
                        section = this.sections[i];
                        break;
                    }
                }

                if (!section) {
                    return;
                }

                this.selected_section = section;
                this.selected_section_id = section.id;

                this.label = section.label;
                this.location_type = 'first';

                // // Are there other sections?
                // this.show_sections_flag = false;
                // if (this.sections.length > 1) {
                //     this.show_sections_flag = true;
                // }
            }
        }
    }
</script>
