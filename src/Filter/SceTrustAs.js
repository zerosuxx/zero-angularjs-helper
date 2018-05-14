angular.module('zerosuxx.zeroNgHelper') 
.filter('sceTrustAs', ['$sce', function($sce) {
    return function(input, type) {
        return typeof input === 'string' ? $sce.trustAs(type || 'html', input) : '';
    };
}]);
