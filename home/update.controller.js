(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpdateController', UpdateController);

    UpdateController.$inject = ['UserService', '$rootScope', 'FlashService', '$location', '$routeParams'];
    function UpdateController(UserService, $rootScope, FlashService, $location, $routeParams) {
        var ctrl = this;

        ctrl.user = {};
        ctrl.allUsers = [];
        ctrl.id = $routeParams.id;
        ctrl.update = update;

        initController();

        function initController() {
            loadData();
        }

        function loadData() {
            ctrl.dataLoading = true;
            UserService.GetById(ctrl.id)
            .then(function(response) {
                // console.log(response);
                ctrl.user.firstName = response.firstName;
                ctrl.user.lastName = response.lastName;
                ctrl.user.username = response.username;
                ctrl.user.password = response.password;
                ctrl.user.userType = response.userType;
                ctrl.user.id = response.id;
                ctrl.dataLoading = false;
            }).catch(function(error) {
                console.log(error);
                ctrl.dataLoading = false;
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