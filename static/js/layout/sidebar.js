(function () {
    'use strict';

    angular
        .module('noteApp')
        .directive('sidebar', sidebar);

    sidebar.$inject = [];

    function sidebar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/layout/sidebar.html',
            replace: true,
            scope: false,
            controller:function($scope) {
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;
                $scope.check = function(x) {
                    if(x==$scope.collapseVar)
                        $scope.collapseVar = 0;
                    else
                        $scope.collapseVar = x;
                    };
                $scope.multiCheck = function(y) {
                    if(y==$scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
            }
        };

        return directive;
    }
})();