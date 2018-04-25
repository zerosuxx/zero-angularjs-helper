angular.module('zerosuxx.zeroNgHelper') 
.factory('HttpApiInterceptor', ['$location', '$q', '$zeroConfig', 'StorageService', function HttpApiInterceptor($location, $q, $zeroConfig, StorageService) {
    var config = $zeroConfig.config.httpApiInterceptors;
    return {
        responseError: function(response) {
            if(response.status === 401) {
                if(config.unauthorized.savePreviousLocationKey) {
                    StorageService.set(config.unauthorized.savePreviousLocationKey, $location.path());
                }
                $location.path(config.locations.unauthorized);
            } else if(response.status === 404) {
                $location.path(config.locations.notFound);
            }
            return $q.reject(response);
        }
    };
}]);
