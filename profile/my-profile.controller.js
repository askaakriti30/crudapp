(function () {
    'use strict';

    angular
        .module('app')
        .controller('MyProfileController', MyProfileController);

    MyProfileController.$inject = ['UserService', '$rootScope', 'FlashService', '$location', '$routeParams'];
    function MyProfileController(UserService, $rootScope, FlashService, $location, $routeParams) {
        var ctrl = this;

        ctrl.user = null;
        ctrl.allUsers = [];

        initController();

        function initController() {
            loadProfile();
        }

        function loadProfile() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    ctrl.user = user;
                }).catch(function(err) {
                    console.log(err);
                });  
        }

        function update() {
            ctrl.dataLoading = true;
            // console.log('userData', ctrl.user);
            UserService.Update(ctrl.user)
                .then(function (response) {
                    //console.log("response >>>>>", response);
                    if (!response) {
                        FlashService.Success('User Updated', true);
                        ctrl.dataLoading = false;
                    } else {
                        FlashService.Error(response);
                        ctrl.dataLoading = false;
                    }
                }).catch(function(err) {
                    console.log(err);
                });
        }

        
    }

})();