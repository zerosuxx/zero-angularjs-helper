angular.module('zerosuxx.zeroNgHelper') 
.directive('list', ['HttpClient', function(HttpClient) {
    var generatePages = function(count) {
        var pages = [];
        for (var i = 1; i <= count; i++) {
            pages.push(i);
        }
        return pages;
    };

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var url = attrs.list;
            var scopeAlias = attrs.scopeAlias;
            var init = attrs.init;
            var maxPage = attrs.maxPage || 5;  

            scope.paginate = function(page) {
                if(scope.currentPage === page || page < 1 || page > scope.lastPage) {
                    return;
                }
                if(page > 1) {
                    scope.prevPage = page-1;
                } else {
                    scope.prevPage = 1;
                }
                scope.currentPage = page;
                scope.slicePages(scope.currentPage, maxPage);
                if(scope.lastPage > page) {
                    scope.nextPage = page+1;
                }
                scope.load({page: page});
            };

            scope.initPages = function(pagesCount, reset) {
                scope.allPages = generatePages(pagesCount);
                scope.lastPage = parseInt(pagesCount);
                scope.slicePages(scope.currentPage, maxPage);
                if(reset) {
                    scope.resetPager();
                }
            };

            scope.setQueryParams = function(params) {
                scope.queryParams = params;
                return scope;
            };

            scope.slicePages = function(currentPage, maxPage) {
                var minPage = currentPage > maxPage ? currentPage - (maxPage+1) : 0;
                scope.pages = scope.allPages.slice(minPage, currentPage+maxPage);
            };

            scope.resetPager = function() {
                scope.prevPage = 1;
                scope.currentPage = 1;
                scope.nextPage = scope.currentPage+1;
            };

            scope.load = function(queryParams) {
                if(!queryParams) {
                    queryParams = {};
                }
                angular.extend(queryParams, scope.queryParams);
                HttpClient.get(url, {params: queryParams}).then(function(response) {
                    var data = response.data;
                    scope[scopeAlias ? scopeAlias : 'list'] = data;
                    scope.initPages(data.pages_count, queryParams.page === undefined);
                    if(scope.onLoads.length > 0) {
                        for(var i in scope.onLoads) {
                            scope.onLoads[i](response);
                        }
                    }
                });
            };
            
            scope.onLoad = function(callback) {
                scope.onLoads.push(callback);
            };
            
            scope.onLoads = [];

            scope.queryParams = {};
            scope.resetPager();

            if(init === undefined || init !== '0') {
                scope.load();
            }
        }
    };
}]);