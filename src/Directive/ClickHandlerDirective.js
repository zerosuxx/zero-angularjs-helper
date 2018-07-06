angular.module('zerosuxx.zeroNgHelper')
.directive('clickHandler', ['HttpClient', function(HttpClient) {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            var method = attrs.method || 'GET';
            var params = attrs.params || {};
            var key = attrs.key;
            scope.ajaxHandle = function(url, callback) {
                HttpClient.request(method, url, params).then(function(response) {
                    var enable = !scope.$eval(key);
                    if(callback) {
                        callback(enable, scope, element[0], attrs);
                    }
                    if(response.data.status === 'success') { 
                        scope.$eval(key + ' = ' + enable);
                    }
                });
            };
            
            scope.handle = function(callback) {
                var enable = !scope.$eval(key);
                callback(enable, scope, element[0], attrs);
                return true;
            };
        }
    };
}]);
