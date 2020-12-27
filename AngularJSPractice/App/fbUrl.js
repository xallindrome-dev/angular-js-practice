//angular.module("app").constant("FirebaseUrl", "https://exptra.firebaseio.com/")
//    .service("rootRef", ["FirebaseUrl", Firebase]);

angular.module("app").config(function ($firebaseRefProvider) {
    $firebaseRefProvider.registerUrl("https://exptra.firebaseio.com/");
});