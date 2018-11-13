(function () {
    'use strict';

    angular
        .module('noteApp')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$rootScope', '$state', 'AuthenticationDataOp'];

    function LogoutController($rootScope, $state, AuthenticationDataOp) {
        var vm = this;

        AuthenticationDataOp.invalidate()
            .then(function(result){
                $rootScope.user = result;
                $state.go('login');
            })
            .catch(function(error){
                // false response
            	console.log(error);
            });
    }
})();
