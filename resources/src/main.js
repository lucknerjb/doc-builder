// src/main.js

import Vue from 'vue'
import App from './App.vue'
import AuthService from './services/AuthService.js'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

// let session = AuthService.getCurrentSession()
// if (session) {
//     Vue.http.headers.common['Authorization'] = "Bearer " + session.access_token
//
//     $.ajaxSetup({
//         beforeSend: function (xhr){
//             xhr.setRequestHeader('Authorization', 'Bearer ' + session.access_token)
//             return xhr
//         }
//     })
// }

require('./router.js')(VueRouter, App)
// window.rl_router = require('./router.js')(VueRouter, App)
// window.rl_app = App
