<template>
    <div id="{{ modalId }}" class="modal fade">
        <div class="modal-dialog {{ sizeClass }}">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close m-t-5" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 class="panel-title">{{ title }}</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <slot></slot>
                    </div>
                </div>
                <div class="modal-footer">
                    <slot name="buttons"></slot>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</template>

<script>
    import store from '../store.js'

    export default {
        ready () {
            console.log(this.buttons)
        },

        events: {
            'modal.close': function() {
                $('.modal.in').modal('toggle');
            }
        },

        props: {
            title: {
                default: ''
            },

            modalId: {
                default: ''
            },

            sizeClass: {
                default: ''
            }
        }
    }
</script>
