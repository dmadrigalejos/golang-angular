(function () {
    'use strict';

    angular
        .module('noteApp')
        .directive('headerNotification', headerNotification);

    headerNotification.$inject = ['$rootScope'];

    function headerNotification($rootScope) {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/layout/header.notification.html',
            replace: true,
            scope: false,
        };

        return directive;
    }
})();