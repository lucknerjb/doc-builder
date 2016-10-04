import Config from '../config.js'
import store from '../store.js'
import HTTP from './HttpService.js'
import EntityService from './EntityService.js'

var ApplicationService = (function() {
    function ApplicationService() {
        this.HTTP = HTTP;
    }

    ApplicationService.prototype.all = function() {
        return this.HTTP.get('/applications');
    }

    ApplicationService.prototype.get = function(id) {
        return this.HTTP.get('/applications/' + id);
    }

    ApplicationService.prototype.delete = function(id) {
        return this.HTTP.delete('/applications/' + id);
    }

    ApplicationService.prototype.create = function(data) {
        return this.HTTP.post('/applications/', data);
    }

    return ApplicationService
})();

export default new ApplicationService
