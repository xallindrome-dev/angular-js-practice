angular.module("app").component("nav", {
    templateUrl: "/App/nav/nav.html",
    controller: function ($firebaseObject, fbRef) {
        this.loaded = false;
        this.userPreferences = $firebaseObject(fbRef.getPreferencesRef());
        this.userPreferences.$loaded().then((function (data) {
            this.loaded = true;
        }).bind(this));

        //this.userPreferences.$watch((function () { // angular way
        //    this.darktheme = this.userPreferences.theme === 'dark';
        //}).bind(this));
    }
})