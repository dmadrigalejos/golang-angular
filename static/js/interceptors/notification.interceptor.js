(function () {
    'use strict';

    angular
        .module('noteApp')
        .factory('notificationInterceptor', notificationInterceptor);

    notificationInterceptor.$inject = ['$q', 'alertService'];

    function notificationInterceptor($q, alertService) {

        var factory = {
            response: response,
            responseError: responseError
        };

        return factory;

        function response(response) {
        	
            var alertMessage = response.headers("X-Note-Alert-Message"),
                alertType = response.headers("X-Note-Alert-Type");

            if (angular.isString(alertMessage)) {
            	alertService.open({
            		alertType: alertType,
            		message: alertMessage,
                    timer: 5000
                })
            }

            return response;

        }

        function responseError(error) {

            var alertMessage = error.headers("X-Note-Alert-Message"),
                alertType = error.headers("X-Note-Alert-Type");

            if (angular.isString(alertMessage)) {
            	alertService.open({
                    alertType: alertType,
                    message: alertMessage,
                    timer: 5000
                })
            }

            return $q.reject(error);

        }

    }

})();