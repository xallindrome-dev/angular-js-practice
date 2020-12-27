angular.module("app").component("login", {
    templateUrl: "/App/security/login.html",
    bindings: {
        currentAuth: '=' // two way binding
    },
    controller: function (auth, $location) {        

        this.loggedIn = !!this.currentAuth; // Falsey or object i.e. true or false

        this.anonLogin = function () {
            auth.$authAnonymously().then(function () {
                $location.path("/App/home");
            }).catch((function (err) {
                this.errorMessage = err.code;
            }).bind(this));
        }

        this.fbLogin = function () {
            auth.$authWithOAuthPopup("facebook").then(function () {
                $location.path("/App/home");
            }).catch((function (err) {
                this.errorMessage = err.code;
            }).bind(this));
        }
    }
})