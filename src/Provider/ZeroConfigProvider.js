angular.module('zerosuxx.zeroNgHelper') 
.provider('$zeroConfig', ['$templateUrlProvider', '$locationProvider', '$logProvider', '$httpProvider', '$qProvider', 
function $zeroConfigProvider($templateUrlProvider, $locationProvider, $logProvider, $httpProvider, $qProvider) {
    this.defaults = {
        app: {
            debug: true,
            version: 'DEV',
            versionCache: true
        },
        template: {
            templateDir: 'templates',
            suffix: ''
        },
        translateStaticFiles: {
            prefix: 'locales/',
            suffix: '.json'
        },
        route: {
            provider: null,
            zeroProvider: null,
            connects: [],
            otherwise: ''
        },
        locationHtml5: {
            enabled: true,
			requireBase: false
        },
        http: {
            interceptors: []
        },
        httpApiInterceptors: {
            locations: {
                unauthorized: '/login',
                notFound: '/404'
            },
            unauthorized: {
                savePreviousLocationKey: 'loginRedirect'
            }
        }
    };
    this.config = this.defaults;
    this.zeroRouteProvider = null;
    this.translateProvider = null;
        
    this.$get = function() {
        return this;
    };
    
    this.setConfig = function(config) {
        var keys = Object.keys(this.defaults);
        for(var i in keys) {
            var key = keys[i];
            var defaultConfig = this.defaults[key];
            if(!config[key]) {
                config[key] = {};
            }
            this.config[key] = angular.extend(this.config[key], defaultConfig, config[key]);
        }
        return this;
    };
    
    this.setZeroRouteProvider = function(zeroRouteProvider) {
        this.zeroRouteProvider = zeroRouteProvider;
        return this;
    };
    
    this.setTranslateProvider = function(translateProvider) {
        this.translateProvider = translateProvider;
        return this;
    };
    
    this.load = function() {
        this.configureDebugMode();
        
        this.configureLocation();
        
        this.configureHttp();
        
        this.configureTranslate();
        
        this.configureTemplateResolver();
        
        this.configureRoute();
    };
    
    this.configureDebugMode = function() {
        var debug = this.config.app.debug;
        $logProvider.debugEnabled(debug);
        $qProvider.errorOnUnhandledRejections(debug);
        return this;
    };
    
    this.configureLocation = function() {
        $locationProvider.html5Mode(this.config.locationHtml5);
        return this;
    };
    
    this.configureHttp = function() {
        if(this.config.http.interceptors.length) {
            for(var i in this.config.http.interceptors) {
                $httpProvider.interceptors.push(this.config.http.interceptors[i]);
            }
        }
        return this;
    };
    
    this.configureTranslate = function() {
        if(this.translateProvider) {
            var configStaticFiles = this.config.translateStaticFiles;
            if(configStaticFiles) {
                if(this.config.app.versionCache) {
                    configStaticFiles.suffix += '?v=' + this.config.app.version;
                }
                this.translateProvider.useStaticFilesLoader(configStaticFiles);
                //this.translateProvider.useSanitizeValueStrategy('escape');
            }
        }
        return this;
    };
    
    this.configureTemplateResolver = function() {
        var config = this.config.template;
        $templateUrlProvider.setTemplateDir(config.templateDir);
        var suffix = '';
        if(config.suffix) {
            suffix = config.suffix;
        }
        if(this.config.app.versionCache) {
            suffix += '?v=' + this.config.app.version;
        }
        $templateUrlProvider.setSuffix(suffix);
        return this;
    };
    
    this.configureRoute = function() {
        var config = this.config.route;
        if(config.zeroProvider) {
            this.setZeroRouteProvider(config.zeroProvider);
        }
        if(this.zeroRouteProvider && config.connects) {
            if(config.provider) {
                this.zeroRouteProvider.setRouteProvider(config.provider);
            }
            if(this.zeroRouteProvider.templateUrlResolver === null) {
                this.zeroRouteProvider.setTemplateUrlResolver(function(data) {
                    return $templateUrlProvider.get(data);
                });
            }
            this.loadRoutes(config, this.zeroRouteProvider);
        }
        return this;
    };
    
    this.loadRoutes = function(routeConfig, zeroRouteProvider) {
        for(var i in routeConfig.connects) {
            var data = routeConfig.connects[i];
            zeroRouteProvider.connect(data[0], data[1], data[2], data[3]);
        }
        if(routeConfig.otherwise) {
            zeroRouteProvider.otherwise(routeConfig.otherwise);
        }
        return this;
    };
}]);
