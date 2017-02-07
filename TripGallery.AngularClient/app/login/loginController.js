(function() {
    "use strict";

    angular
        .module("tripGallery")
        .controller("loginController",
            ["$http", LoginController]);

    function LoginController($http) {
        var vm = this;

        vm.loginError = "";
        vm.credentials = {
            username: "",
            password: ""
        };

        vm.submit = function() {
            vm.loginError = "";

            var dataForBody = "grant_type=password&" +
                "username=" +
                encodeURI(vm.credentials.username) +
                "&" +
                "password=" +
                encodeURI(vm.credentials.password) +
                "&" +
                "scope=" +
                encodeURI("gallerymanagement");

            var encodedClientAndSecret = btoa("tripgalleryropc:myrandomclientsecret");

            var messageHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedClientAndSecret
            };

            return $http({
                    method: 'POST',
                    url: "https://localhost:44317/identity/connect/token",
                    headers: messageHeaders,
                    data: dataForBody
                })
                .success(function(data) {
                    localStorage["access_token"] = data.access_token;

                    vm.credentials.username = "";
                    vm.credentials.password = "";

                    window.location = window.location.protocol + "//" + window.location.host + "/";
                })
                .error(function(data) {
                    vm.loginError = data.error;

                    vm.credentials.username = "";
                    vm.credentials.password = "";
                });
        }
    }
}());