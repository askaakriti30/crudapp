(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.html',
                controllerAs: 'ctrl'
            })

            .when('/create', {
                controller: 'HomeController',
                templateUrl: 'home/create.html',
                controllerAs: 'ctrl'
            })

            .when('/update/:id', {
                controller: 'UpdateController',
                templateUrl: 'home/update.html',
                controllerAs: 'ctrl' 
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.html',
                controllerAs: 'ctrl'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.html',
                controllerAs: 'ctrl'
            })

            .when('/dashboard', {
                controller: 'DashboardController',
                templateUrl: 'dashboard/dashboard.html',
                controllerAs: 'ctrl'
            })

            .when('/my-profile', {
                controller: 'MyProfileController',
                templateUrl: 'profile/my-profile.html',
                controllerAs: 'ctrl'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }


        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

        
    }

})();