(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'FlashService', '$location'];
    function HomeController(UserService, $rootScope, FlashService, $location) {
        var ctrl = this;

        ctrl.user = null;
        ctrl.allUsers = [];
        ctrl.deleteUser = deleteUser;
        ctrl.register = register;

        console.log('$id >>', $rootScope.$id);

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    ctrl.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    ctrl.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        function register() {
            ctrl.dataLoading = true;
            ctrl.user.userType = 'user';
            console.log('userData', ctrl.user);
            UserService.Create(ctrl.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('User Registered', true);
                        ctrl.dataLoading = false;
                        $location.path('/create');
                    } else {
                        FlashService.Error(response.message);
                        ctrl.dataLoading = false;
                    }
                }).catch(function(err) {
                    console.log(err);
                });
        }
    }

})();