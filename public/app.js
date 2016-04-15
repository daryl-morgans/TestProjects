angular
    .module('app', ['ui.bootstrap'])
    .controller('todolist', todoList);


function todoList($scope,$http) {

    $http.get("/todo").success( function(data) {
         $scope.todolist = data
    });

    $scope.adding = false;

    $scope.lastaction = "No action performed yet!";
    
    $scope.edit = function (item) {
        $scope.lastaction = "Clicked edit on line " + item + ".";

    }

    $scope.delete = function (item) {

        $scope.lastaction = "Clicked delete on line " + item + ".";
        $scope.todolist.splice(item,1);

    }

    $scope.new = function () {
        $scope.lastaction = "Clicked the new button.";
        $scope.adding = true;
    }

    $scope.add = function () {
        $scope.lastaction = "Clicked the add button.";
        $scope.adding = false;
        $scope.todolist.push({id: $scope.newID,content:$scope.newContent})
        $scope.newID = "";
        $scope.newContent= "";
    }

    $scope.cancel = function () {
        $scope.lastaction = "Clicked the cancel button.";
        $scope.adding = false;
        $scope.newID = "";
        $scope.newContent= "";
    }

}




/**
 * Created by daryl on 4/3/2016.
 */
