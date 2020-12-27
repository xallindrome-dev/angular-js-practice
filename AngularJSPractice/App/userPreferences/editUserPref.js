angular.module("app").component("editUserPref", {
    templateUrl: "/App/userPreferences/editUserPref.html",
    bindings: {
        userPrefData: '=userPreferences' // internally called userPrefData but bound outside by =Prop
    },
    controller: function (fbRef, $scope, $location) {
        this.themes = [
            "light",
            "dark"
        ]

        // bind to name of property on scope to bind to
        this.userPrefData.$bindTo($scope, "$ctrl.userPreferences").then((function () { // .then not needed for simple 3-way binding
            if (!this.userPreferences.theme) { // setup theme for new users
                this.userPreferences.theme = this.theme[0];
            }
        }).bind(this));

        this.save = function () {
            this.userPreferences.$save();
            $location.path("/App/home");
        }

        this.cancel = function () {
            $location.path("/App/home");
        }
    }
})