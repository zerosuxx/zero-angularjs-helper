angular.module('zerosuxx.zeroNgHelper') 
.provider('$zeroConfig', ['$templateUrlProvider', '$zeroRouteProvider', '$locationProvider', '$logProvider', '$httpProvider', '$qProvider', function $zeroConfigProvider($templateUrlProvider, $zeroRouteProvider, $locationProvider, $logProvider, $httpProvider, $qProvider) {
    this.defaults = {
        
    };    
        
    this.$get = function() {
        return this;
    };
    
    this.setConfig = function(config) {
        
    };
}]);
