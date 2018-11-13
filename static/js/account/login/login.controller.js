(function () {
    'use strict';

    angular
        .module('noteApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', 'AuthenticationDataOp'];

    function LoginController($rootScope, $state, AuthenticationDataOp) {
        var vm = this;
        vm.login = login;
        vm.user = {employeeId : "", password : ""};

        function login(user, isValid){
            if (!isValid) {
                if (user.username == undefined)
                    user.username = '';
                if (user.password == undefined)
                    user.password = '';
                if (user.username == '')
                    vm.username = true;
                if (user.password == '')
                    vm.pass = true;
                if (user.username == '' && user.password == '') {
                    vm.username = true;
                    vm.pass = true;
                }
                
                return;
            }

            AuthenticationDataOp.login(user)
                .then(function(result){
                    $rootScope.user = result.data;
                    $state.go('dashboard.home');
                })
                .catch(function(error){
                    vm.username = true;
                    vm.pass = true;
                    user.employeeId = '';
                    user.password = '';
                    $("#login_username").focus();
                    if (error.data != null)
                        vm.status = error.data.username;
                    if (error.status == 404 || error.status == -1)
                        vm.status = "Please Contact Administrator"
                });
        }
    }
})();