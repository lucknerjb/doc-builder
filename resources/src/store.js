import Vuex from 'vuex'
import Vue from 'vue'
import Config from './config.js'
import AuthService from './services/AuthService.js'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        errorMessage: '',
    },

    getters: {
        currentUser: state => Lockr.get('sp-user')
    },

    mutations: {
        INCREMENT (state) {
            state.counter++
        },

        REDIRECT_IF_AUTHENTICATED (state) {
            // @TODO
            if (AuthService.getCurrentSession()) {
                window.location.href = '/s/dashboard'
            }
        },

        HIDE_ERROR_MESSAGE: function(state) {
            state.errorMessage = ''
        },

        SHOW_MESSAGE: function(state, className, errorMessage) {
            $.notify(errorMessage, {
                clickToHide: true,
                autoHide: true,
                autoHideDelay: 3000,
                position: 'bottom right',
                className: className
            })
        },
    },

    //strict: true    // Disable in production as it slows down the app. Prevents writing to the store directly
})

export default store
