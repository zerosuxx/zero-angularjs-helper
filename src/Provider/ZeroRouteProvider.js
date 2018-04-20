angular.module('zerosuxx.zeroNgHelper') 
.provider('$zeroRoute', ['$routeProvider', function $zeroRouteProvider($routeProvider) {
    angular.extend(this, $routeProvider);

    this.templateUrlResolver = null;

    this.setTemplateUrlResolver = function(resolver) {
        this.templateUrlResolver = resolver;
    };

    this.connect = function(route, template, controller, extendedConfig) {
        if(!this.templateUrlResolver) {
            throw new Error('TemplateResolver not found!');
        }
        var config = {};
        if(extendedConfig === undefined) {
            extendedConfig = {};
        }
        var templateData = angular.isArray(template) ? template : [template];

        config.templateUrl = this.templateUrlResolver(templateData);
        if(controller) {
            config.controller = controller;
            if(extendedConfig.controllerAs === undefined) {
                extendedConfig.controllerAs = 'ctrl';
            }
        }
        if(extendedConfig) {
            angular.extend(config, extendedConfig);
        }
        return this.when(route, config);
    };
}]);
