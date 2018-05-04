angular.module('zerosuxx.zeroNgHelper') 
.factory('DisableReloadCurrentTemplate', ['$route', function($route) {
    return function(scope) {
        var lastRoute = $route.current;
        var remove = scope.$on('$locationChangeSuccess', function() {
            if($route.current.$$route && lastRoute.$$route.templateUrl === $route.current.$$route.templateUrl) {
                $route.current = lastRoute;
                remove();
            }
        });
    };
}]);
