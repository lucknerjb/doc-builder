// file: vue/core/component.js

// doc: http://vuejs.org/api/#Vue-component
module.exports = function (Vue) {
	// Example: Vue.component('grid',                              require('./component/grid'));
	Vue.component('example', require('./component/example'));
	Vue.component('db-header', require('./component/header/header.js'));
	Vue.component('db-sidebar', require('./component/sidebar/sidebar.js'));

	return Vue;
}
