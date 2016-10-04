var component = {
    attached: function () {
        console.log(' attached header');

    },
    props: ['msg', 'list'],
    template: require('./header.html'),
    data: function() {
        return {
            filterQuery: ''
        }
    },
    methods: {

    }
}
module.exports = component;
