(function() {
    "use strict";

    angular
        .module("common.services")
        .factory("tokenContainer",
            [tokenContainer]);

    function tokenContainer() {
        var container = {
            token: ""
        };

        var setToken = function(token) {
            container.token = token;
        };

        var getToken = function () {
           // debugger;
            if (container.token === "") {
                if (localStorage.getItem("access_token") === null) {
                    var url =
                        "https://localhost:44317/identity/connect/authorize?" +
                            "client_id=tripgalleryimplicit&" +
                            "redirect_uri=" +
                            encodeURI(window.location.protocol + "//" + window.location.host + "/callback.html") +
                            "&" +
                            "response_type=token&" +
                            "scope=gallerymanagement";

                    window.location = url;

                } else {
                    setToken(localStorage["access_token"]);
                }
            }
            return container;
        };

        return {
            getToken: getToken
        };
    };
})();