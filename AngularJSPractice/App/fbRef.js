angular.module("app").factory("fbRef", function ($firebaseRef, $firebaseAuthService) {
    return {
        getPreferencesRef: function () {
            return $firebaseRef.default.child("preferences").child($firebaseAuthService.$getAuth().uid);
        },
        getCategoriesRef: function () {
            return $firebaseRef.default.child("categories");
        },
        getExpensesRef: function () {
            return $firebaseRef.default.child("expenses").child($firebaseAuthService.$getAuth().uid);
        }
    }
})