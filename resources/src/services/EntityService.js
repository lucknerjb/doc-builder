import Config from '../config.js'
import store from '../store.js'
import HTTP from './HttpService.js'

var EntityService = (function() {
    function EntityService(baseUrl) {
        this.HTTP = HTTP;
        this.baseUrl = baseUrl;
    }

    EntityService.prototype.all = function(baseUrl) {
        baseUrl = baseUrl || this.baseUrl
        return this.HTTP.all(baseUrl);
    }

    EntityService.prototype.delete = function() {
        return this.HTTP.all('/applications');
    }

    return EntityService
})();

export default EntityService
