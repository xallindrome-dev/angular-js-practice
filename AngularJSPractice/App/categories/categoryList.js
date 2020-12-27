angular.module("app").component("categoryList", {
    templateUrl: "/App/categories/categoryList.html",
    bindings: {
        categories: "="
    },
    controller: function () {
        this.createNewCategory = function () {
            this.categories.$add({
                name: this.newCategoryName
            });
            this.newCategoryName = "";
        }
    }
})