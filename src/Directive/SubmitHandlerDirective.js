angular.module('zerosuxx.zeroNgHelper') 
.directive('ngSubmit', ['HttpClient', function(HttpClient) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var scrollTop = attrs.scrolltop;
            scope.validate = function(callback) {
                var errors = callback(scope, element[0], attrs);
                if(!(errors instanceof Object)) {
                    errors = {};
                }
                var hasError = Object.keys(errors).length > 0;
                if(hasError) {
                    scope.errors = errors;
                }
                return !hasError;
            };
            scope.resetForm = function(response, scope, element, attrs) {
                element.reset();
                return true;
            };
            scope.ajaxHandle = function(url, callback) {
                var method = attrs.method || 'POST';
                var args = arguments;
                HttpClient.request(method, url, element[0]).then(function(response) {
                    for(var i = 1; i < args.length; i++) {
                        args[i](response, scope, element[0], attrs);
                    }
                    if(response.data.status && response.data.message) {
                        if(attrs.name) {
                            scope.alerts = {};
                            scope.alerts[attrs.name] = true;
                        }
                        scope.alert = {
                            status: response.data.status,
                            message: response.data.message
                        };
                        if(response.data.errors) {
                            scope.errors = response.data.errors;
                        } else {
                            scope.errors = [];
                        }
                        if(scrollTop) {
                            var scrollTo = 0;
                            if(scrollTop === 'element') {
                                scrollTo = element[0].offsetTop - element[0].scrollTop;
                            }
                            document.body.scrollTop = document.documentElement.scrollTop = scrollTo;
                        }
                    }
                });
                return true;
            };
            scope.handle = function(callback) {
                callback(scope, element[0], attrs);
                return true;
            };
        }
    };
}]);