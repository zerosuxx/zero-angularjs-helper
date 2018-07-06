angular.module('zerosuxx.zeroNgHelper') 
.directive('include', ['$templateUrl', function($templateUrl) {
    var generateId = function(type, src) {
        return type + '_' + src.replace(/-/g, '');
    };

    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs) {
            var type = attrs.include;
            var src = attrs.src;
            if(type === 'element') {
                scope[generateId(type, src)] = $templateUrl.getElement(src);
            } else {
                scope[generateId(type, src)] = $templateUrl.getTemplate(type, src);
            }
        },
        template: function(element, attrs) {
            var onloadAttr = attrs.onload ? ' onload="'+attrs.onload+'"' : '';
            return '<div ng-include="' + generateId(attrs.include, attrs.src) + '"'+onloadAttr+'></div>';
        }
    };
}]);