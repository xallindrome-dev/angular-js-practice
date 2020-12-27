(function () {
    'use strict';

    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute',
        'firebase'
    ]);

    app.run(function ($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function (e, next, prev, err) {
            if (err === "AUTH_REQUIRED") {
                $location.path("/App/login")
            }
        })
    })

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/App/home", {
                template: "<home categories='$resolve.categories' expenses-in-order='$resolve.expensesInOrder'></home>",
                //resolve: {
                //    currentAuth: function (auth) {
                //        return auth.$requireAuth();
                //    }
                //}
                resolve: {
                    expensesInOrder: function (fbRef, expenseList, $firebaseAuthService) {
                        return $firebaseAuthService.$requireAuth().then(function () {
                            var query = fbRef.getExpensesRef().orderByChild("date");
                            return expenseList(query).$loaded();
                        })
                    },
                    categories: function (fbRef, $firebaseArray, $firebaseAuthService) {
                        return $firebaseAuthService.$requireAuth().then(function () {
                            var query = fbRef.getCategoriesRef().orderByChild("name");
                            return $firebaseArray(query).$loaded();
                        })
                    }
                }
            })
            .when("/App/userpref", {
                template: "<edit-user-pref user-preferences='$resolve.userPreferences'></edit-user-pref>",
                resolve: {
                    userPreferences: function (fbRef, $firebaseObject, $firebaseAuthService) {
                        return $firebaseAuthService.$requireAuth().then(function () {
                            return $firebaseObject(fbRef.getPreferencesRef()).$loaded();
                        })                        
                    }
                }
            })
            .when("/App/categories", {
                template: "<category-list categories='$resolve.categories'></category-list>",
                resolve: {
                    categories: function (fbRef, $firebaseArray, $firebaseAuthService) {
                        return $firebaseAuthService.$requireAuth().then(function () {
                            var query = fbRef.getCategoriesRef().orderByChild("name");
                            return $firebaseArray(query).$loaded();
                        })
                    }
                }
            })
            .when("/App/login", {
                template: "<login current-auth='$resolve.currentAuth'></login>",
                resolve: {
                    currentAuth: function ($firebaseAuthService) {
                        return $firebaseAuthService.$waitForAuth();
                    }
                }
            })
            .when("/App/logout", {
                template: "<logout></logout>",
            })
            .otherwise("/App/home");
    })
})();
