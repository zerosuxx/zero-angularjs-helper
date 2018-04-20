angular.module('zerosuxx.ngApp') 
.directive('include', ['$templateUrl', function($templateUrl) {
    var includesCount = {};
    var maxIncludesCount = 100;

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
                scope[generateId(type, src)] = src;
            }
        },
        template: function(element, attrs) {
            var onloadAttr = attrs.onload ? ' onload="'+attrs.onload+'"' : '';
            var id = generateId(attrs.include, attrs.src);
            if(includesCount[id] === undefined) {
                includesCount[id] = 0;
            }
            includesCount[id]++;
            if(maxIncludesCount <= includesCount[id]) {
                throw new Error('Max includes count increased: ' + id);
            }
            return '<div ng-include="' + generateId(attrs.include, attrs.src) + '"'+onloadAttr+'></div>';
        }
    };
}]);