//Angular application module
var myApp = angular.module("myApp", []);

//Add an Angular controller
myApp.controller('AppCtrl', function($scope, $http) {

    //called when page loads
    var init = function() {
        //Attempt to populate $scope.model from Node server
        fetchMenuList();
        //If $scope.model is still undefined, initiate it
        if ($scope.model === undefined) {
            $scope.model = {
                menus: [],
                selectedMenu: {}
            };
        }
    }

    //Fetch menuList from Node server
    var fetchMenuList = function() {
        //Send a GET request at /getMenuList
        $http.get('/getMenuList').success(function(response) {
            $scope.model.menus = response;
            $scope.model.selectedMenu = {};
        });
    };

    //Adding $scope adds this function to the controller's scope, allowing it to be called from Angular directives
    $scope.onMenuClicked = function(menu) {
        $scope.model.selectedMenu.isSelected = false;
        menu.isSelected = true;
        $scope.model.selectedMenu = menu;
    }

    $scope.isAnyMenuSelected = function() {
        return !angular.equals($scope.model.selectedMenu, {});
    }

    $scope.getSelectedMenuName = function() {
        if (!$scope.isAnyMenuSelected()) {
            return "No Menu Selected";
        }
        if ($scope.model.selectedMenu.name === undefined || $scope.model.selectedMenu.name === "") {
            return "Enter Menu Name";
        }
        return $scope.model.selectedMenu.name;
    }

    $scope.addMenu = function() {
        var newMenu = {
            name: "",
            isSelected: false,
            items: []
        }
        $http.post('/addNewMenu', newMenu).success(
            function(response) {
                newMenu = response;
                $scope.model.menus.push(newMenu);
                $scope.onMenuClicked(newMenu);
            }
        );
    }

    $scope.deleteMenu = function(idx) {
        var removedMenu = $scope.model.menus[idx];
        $http.post('/deleteMenu', removedMenu).success(
            function(response) {
                if (angular.equals($scope.model.menus[idx], $scope.model.selectedMenu)) {
                    $scope.model.selectedMenu = {};
                }
                $scope.model.menus.splice(idx, 1);
            }
        );
    }

    $scope.saveMenu = function(menu) {
        $http.put('/updateMenu/', menu);
    }

    $scope.addItem = function() {
        var newItem = {
            name: "",
            price: "",
            parent: $scope.model.selectedMenu._id
        }
        $http.post('/addNewItem', newItem).success(
            function(response) {
                newItem = response;
                $scope.model.selectedMenu.items.push(newItem);
            }
        );

    }

    $scope.deleteItem = function(idx) {
        var removedItem = $scope.model.selectedMenu.items[idx];

        $http.post('/deleteItem', removedItem).success(
            function(response) {
                $scope.model.selectedMenu.items.splice(idx, 1);
            }
        );

    }

    $scope.saveItem = function(item) {
        $http.put('/updateItem/', item);
    }

    init();

});
