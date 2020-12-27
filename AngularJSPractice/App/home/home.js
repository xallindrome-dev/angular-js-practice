angular.module("app").component("home", {
    templateUrl: "/App/home/home.html",
    bindings: {
        expensesInOrder: "=",
        categories: "="
    },
    //controller: function (rootRef) {
    //    rootRef.on("value", function () {
    //        console.log("connected");
    //    })
    //}
    controller: function () {
        this.createExpense = function (expenseData) {
            this.expensesInOrder.$add(expenseData);
        }

        this.editExpense = function (expense) {
            this.editedExpense = expense;
        }

        this.updateExpense = function () {
            this.expensesInOrder.$save(this.editedExpense);
        }
    }
});