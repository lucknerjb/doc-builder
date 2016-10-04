var component = {
    attached: function () {
        console.log(' attached sidebar');

    },
    props: ['msg', 'list'],
    template: require('./sidebar.html'),
    data: function() {
        return {
            menu: [
              {
                "label": "Installation",
                "position": 0,
                "sub_menu": [
                  {
                    "position": 0,
                    "label": "Browser",
                    "location": "install-browser"
                  },
                  {
                    "position": 1,
                    "label": "Bower",
                    "location": "install-bower"
                  },
                  {
                    "position": 2,
                    "label": "NPM",
                    "location": "install-npm"
                  }
                ]
              },
              {
                "label": "Options",
                "position": 1,
                "sub_menu": []
              }
            ]
        }
    },
    methods: {
      addSection: function(event) {
        console.log('in addSection')
        event.preventDefault();
        var menu_length = this.menu.length;
        this.menu.push({
          "label": "Methods",
          "position": menu_length,
          "sub_menu": []
        });
      }
    }
}
module.exports = component;
