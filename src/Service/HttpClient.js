angular.module('zerosuxx.ngApp')
.service('HttpClient', ['$http', function HttpClient($http) {
    angular.extend(this, $http);

    this.request = function(type, url, data, config) {
        if(config === undefined) {
            config = {};
        }
        var lowerType = type.toLowerCase();
        if(lowerType === 'get') {
            return this.getWithData(url, data, config);
        } else if(lowerType === 'post') {
            return this.postFormData(url, data, config);
        }
    };

    this.getWithData = function(urlOrConfig, data, config) {
        if(config === undefined) {
            config = {};
        }
        if(data instanceof Element) {
            config.paramSerializer = function(params) {
                return new URLSearchParams(params).toString();
            };
            config.params = new FormData(data);
        } else {
            config.params = data;
        }
        return this.get(urlOrConfig, config);
    };

    this.postFormData = function(urlOrConfig, data, config) {
        var formElement = data instanceof Element ? data : undefined;

        var formData = new FormData(formElement);
        if(formElement === null) {
            for(var key in Object.keys(data)) {
                formData.append(key, data[key]);
            }
        }
        if(config === undefined) {
            config = {};
        }
        if(typeof config.headers === 'undefined') {
            config.headers = {};
            config.headers['Content-Type'] = undefined;
        }
        return this.post(urlOrConfig, formData, config);
    };
}]);
