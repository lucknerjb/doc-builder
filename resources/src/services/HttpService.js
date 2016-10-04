import Config from '../config.js'
import store from '../store.js'
import AuthService from './AuthService.js'

// export default {
//     get () {
//         reqwest({})
//     }
// }

var HTTP = (function() {
    function HTTP() {
    }

    function getHeaders() {
        let user = AuthService.getCurrentUser()
        let headers = {
            'Accept': 'application/json'
        }

        if (user && user.profile.app_token) {
            headers['Authorization'] = 'Token ' + user.profile.app_token
        }

        return headers;
    };

    HTTP.prototype.get = function(endpoint) {
        return reqwest({
            method: 'get',
            url: Config.apiUrl + endpoint,
            headers: getHeaders()
        })
    };

    HTTP.prototype.post = function(endpoint, data) {
        return reqwest({
            method: 'post',
            data: data,
            url: Config.apiUrl + endpoint,
            headers: getHeaders()
        })
    };

    HTTP.prototype.put = function(endpoint, data) {
        return reqwest({
            method: 'put',
            data: data,
            url: Config.apiUrl + endpoint,
            headers: getHeaders()
        })
    };

    HTTP.prototype.patch = function(endpoint, data) {
        return reqwest({
            method: 'patch',
            data: data,
            url: Config.apiUrl + endpoint,
            headers: getHeaders()
        })
    };

    HTTP.prototype['delete'] = function(endpoint) {
        return reqwest({
            method: 'delete',
            url: Config.apiUrl + endpoint,
            headers: getHeaders()
        })
    };

  return HTTP;
})();

export default new HTTP
