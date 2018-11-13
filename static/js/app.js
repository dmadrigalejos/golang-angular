(function () {
    'use strict';

    angular
    	.module('noteApp', ['ui.router','ngMessages','ui.bootstrap','angular-loading-bar'])
    
        .config(stateConfig)
        .run(stateRun);

    stateConfig.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider'];
    stateRun.$inject = ['$rootScope', 'AuthenticationDataOp', '$state'];

    function stateConfig($stateProvider,$urlRouterProvider,$httpProvider) {

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider
        .state('dashboard', {
            url:'/dashboard',
            templateUrl: 'js/layout/main.html'
        })
        .state('dashboard.home',{
            url:'/home',
            controller: 'MainCtrl',
            templateUrl:'js/entities/home/home.html'
        })
        .state('login',{
            templateUrl:'js/account/login/login.html',
            url:'/login',
            controller: 'LoginController',
            controllerAs: 'vmLogin'
        })
        .state('dashboard.logout',{
            url: '/logout',
            controller: 'LogoutController',
            controllerAs: 'vmLogout'

        })
        
        $httpProvider.interceptors.push('notificationInterceptor');
    }

    function stateRun($rootScope, AuthenticationDataOp, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.nextPage = toState.name;
            $rootScope.prevPage = fromState.name;
            AuthenticationDataOp.authenticate()
                 .then(function(result){
                	$rootScope.user = result.data;
                    if (result.data.username == undefined) {
                        $state.go('login');
                    }
                    else if (result.data.username != undefined && $rootScope.nextPage == 'login')
                        $state.go('dashboard.home')
                 })
                 .catch(function(error){
                    $state.go('login');
                 });
             return;
        });
    }
})();



