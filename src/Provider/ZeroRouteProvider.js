angular.module('zerosuxx.zeroNgHelper') 
.provider('$zeroRoute', function $zeroRouteProvider() {
    this.templateUrlResolver = null;
    this.routeProvider = null;

    this.$get = function() {
        return this;
    };

    this.setTemplateUrlResolver = function(resolver) {
        this.templateUrlResolver = resolver;
        return this;
    };
    
    this.setRouteProvider = function(routeProvider) {
        this.routeProvider = routeProvider;
        angular.extend(this, routeProvider);
        return this;
    };

    this.connect = function(route, template, controller, extendedConfig) {
        if(!this.templateUrlResolver) {
            throw new Error('TemplateResolver not found!');
        }
        if(!this.routeProvider) {
            throw new Error('RouteProvider not found!');
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
});
