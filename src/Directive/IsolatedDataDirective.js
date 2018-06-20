angular.module('zerosuxx.zeroNgHelper') 
.directive('isolatedData', ['$rootScope', 'HttpClient', function($rootScope, HttpClient) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {                
            scope.load = function(url, scopeAlias, queryParams) {
                HttpClient.get(url, {params: queryParams}).then(function(response) {
                    scope[scopeAlias ? scopeAlias : 'data'] = response.data;
                });
            };
            scope.reload = function() {
                scope.load(attrs.data, attrs.scopeAlias, attrs.params);
            };
            scope.reload();  
        }
    };
}]);
