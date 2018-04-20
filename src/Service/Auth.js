angular.module('zerosuxx.ngApp') 
.service('Auth', ['HttpClient', 'StorageService', function Auth(HttpClient, StorageService) {
    this.init = function() {
        var auth = StorageService.getUnSerialized('Auth');
        if(auth) {
            HttpClient.defaults.headers.common['Auth-Token'] = auth.token;
        }
    };    

    this.login = function(data) {
        StorageService.setSerialized('Auth', data);
        this.init();
    };

    this.getUser = function(key) {
        var data = StorageService.getUnSerialized('Auth');
        if(key !== undefined) {
            data = data[key];
        }
        return data;
    };

    this.logout = function() {
        StorageService.remove('Auth');
        HttpClient.defaults.headers.common['Auth-Token'] = undefined;
    };

    this.isLogged = function() {
        return this.getUser() !== null;
    };
}]);

