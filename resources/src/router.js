import store from './store'
import MainComponent from './components/MainComponent.vue'

module.exports = function(VueRouter, VueApp) {
    var router = new VueRouter({
        history: true,
        linkActiveClass: 'active'
    });

    router.map({
        '/': {
            name: 'home',
            component: MainComponent,
            auth: true
        }
    });

    router.start(VueApp, '#app');

    window.__doc_builder = {
        app: VueApp,
        router: router,
        // config: require('./config.js'),
    }

    return router;
};
