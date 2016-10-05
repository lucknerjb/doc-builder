<template>
    <header id="header" class="header">
        <div class="container">
            <div class="branding">
                <h1 class="logo" id="top">
                    <a href="index.html">
                        <span aria-hidden="true" class="icon_documents_alt icon"></span>
                        <!--
                        <span class="text-highlight">My</span><span class="text-bold">Project</span>
                        -->
                        <span class="text-highlight">{{ title }}</span>
                    </a>
                </h1>
                <div class="btn-group pull-right" role="group">
                    <button type="button"
                            class="btn"
                            v-on:click="toggleEditMode(false)"
                            v-bind:class="{ 'btn-success': !app_edit_mode, 'btn-default': app_edit_mode }">Preview Mode</button>
                    <button type="button"
                            class="btn"
                            v-on:click="toggleEditMode(true)"
                            v-bind:class="{ 'btn-success': app_edit_mode, 'btn-default': !app_edit_mode }">Edit Mode</button>
                </div>
            </div><!--//branding-->
        </div><!--//container-->
    </header><!--//header-->
</template>

<script>
    import store from '../store'
    export default {
        ready () {
        },

        props: ['title', 'app_edit_mode'],

        methods: {
            toggleEditMode: function(mode) {
                if (this.app_edit_mode === mode) {
                    return;
                }
                this.$dispatch('app.edit_mode.toggle');
            }
        }
    }
</script>
