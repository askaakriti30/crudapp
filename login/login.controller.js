(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', '$rootScope'];
    function LoginController($location, AuthenticationService, FlashService, UserService, $rootScope) {
        var ctrl = this;

        ctrl.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            ctrl.dataLoading = true;
            AuthenticationService.Login(ctrl.username, ctrl.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(ctrl.username, ctrl.password);
                    UserService.GetByUsername(ctrl.username)
                    .then(function (user) {
                       if(user.userType == 'admin') {
                            $rootScope.loggedin = true;
                            //console.log('user =', user);
                            $location.path('/');
                        } else {
                            console.log("root >>>>", $rootScope);
                            $location.path('/dashboard');
                        }
                        $rootScope.id = user.id;
                    });
                } else {
                    FlashService.Error(response.message);
                    ctrl.dataLoading = false;
                }
            });
        };
    }

})();
