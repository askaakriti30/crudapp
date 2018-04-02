(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['UserService', '$rootScope'];
    function DashboardController(UserService, $rootScope) {
        var ctrl = this;

        ctrl.user = null;
        ctrl.allUsers = [];
        ctrl.deleteUser = deleteUser;

        initController();

        console.log('$id >>', $rootScope.$id);

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
    }

})();