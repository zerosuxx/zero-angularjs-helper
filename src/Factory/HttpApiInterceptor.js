angular.module('zerosuxx.zeroNgHelper') 
.factory('HttpApiInterceptor', ['$location', '$q', 'StorageService', function HttpApiInterceptor($location, $q, StorageService) {
    return {
        responseError: function(response) {
            if(response.status === 401) {
                StorageService.set('loginRedirect', $location.path());
                $location.path('/login');
            } else if(response.status === 404) {
                $location.path('/404');
            } else if(response.status === 301 || response.status === 302) {

            }
            return $q.reject(response);
        }
    };
}]);
