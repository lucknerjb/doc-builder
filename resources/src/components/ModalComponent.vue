<template>
    <full-modal title="Add content block" modal-id="add-content-block" size-class="modal-lg">
        <form class="form-horizontal" role="form">
            <!-- TODO: Used to be class 'form-group'... do we need a class here? -->
            <div class="form-group">
                <div class="col-md-6">
                    <label for="">Type</label>
                    <select class="form-control" v-model="type">
                        <option value="text">Text</option>
                        <option value="code">Code Line</option>
                        <option value="code_block">Code Block</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-12">
                    <label for="">Content</label>
                    <textarea rows="8" cols="40" v-model="content"></textarea>
                </div>
            </div>
            <div class="clear"></div>
        </form>

        <div slot="buttons">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary waves-effect waves-light void" v-on:click="save">Add Content Block</button>
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

        ready () {},
        props: ['type', 'content'],

        data: function() {
            return {
            }
        },

        methods: {
            save: function() {
            }
        }
    }
</script>
