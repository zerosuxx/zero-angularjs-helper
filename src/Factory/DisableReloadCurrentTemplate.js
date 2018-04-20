angular.module('zerosuxx.zeroNgHelper') 
.factory('DisableReloadCurrentTemplate', ['$route', function($route) {
    return function(scope) {
        var lastRoute = $route.current;
        scope.$on('$locationChangeSuccess', function() {
            if(lastRoute.$$route.templateUrl === $route.current.$$route.templateUrl) {
                $route.current = lastRoute;
            }
        });
    };
}]);