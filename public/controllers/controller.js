var myApp = angular.module("myApp", []);
myApp.controller('AppCtrl', function($scope, $http) {

  $scope.model = {

    menus: [
      {name: "Breakfast", isSelected: false,items: [{name: "Pizza",price: 10},{name: "Chicken",price: 15}, {name: "Salad",price: 32}]},
      {name: "Lunch",isSelected: false, items: [{name: "Fish",price: 35}]}
    ],
    selectedMenu: {},


  };

  $scope.onMenuClicked = function(menu){
    $scope.model.selectedMenu.isSelected = false;
    menu.isSelected = true;
    $scope.model.selectedMenu = menu;
  }

  $scope.isAnyMenuSelected = function(){
      return !angular.equals($scope.model.selectedMenu,{});
  }

  $scope.getSelectedMenuName = function(){
    if(!$scope.isAnyMenuSelected()){
      return "No Menu Selected";
    }
    if ($scope.model.selectedMenu.name === undefined || $scope.model.selectedMenu.name === ""){
      return "Enter Menu Name";
    }
    return $scope.model.selectedMenu.name;
  }

  $scope.addMenu = function(){
      var newMenu = {name: "",isSelected: false, items: []}
      $scope.model.menus.push(newMenu);
      $scope.onMenuClicked(newMenu);
  }

  $scope.deleteMenu = function(idx){
      if(angular.equals($scope.model.menus[idx],$scope.model.selectedMenu)){
          $scope.model.selectedMenu = {};
      }
      var removedMenu = $scope.model.menus.splice(idx,1);
  }

  $scope.addItem = function(){
      var newItem = {name: ""}
      $scope.model.selectedMenu.items.push(newItem);
  }

  $scope.deleteItem = function(idx){
      var removedItem = $scope.model.selectedMenu.items.splice(idx,1);
  }


  // var refresh = function() {
  //   $http.get('/contactlist').success(function(response) {
  //     $scope.contactlist = response;
  //     $scope.contact = '';
  //   });
  // };

  //refresh();

  // $scope.addContact = function() {
  //   $http.post('/contactlist', $scope.contact).success(
  //     function(response) {
  //       console.log(response);
  //       refresh();
  //     }
  //   );
  // };


  // $scope.remove = function(contact) {
  //   console.log(contact);
	// 	console.log("ANGULAR message - remove");
  //   //$http.delete('/contactlist/' + id);
  //   $http.post('/contactlist/delete', contact).success(
  //     function(response) {
  //       refresh();
  //     }
  //   );
  // };

  // $scope.edit = function(contact) {
  //   $scope.contact = contact;
  // };

  // $scope.update = function() {
  //   console.log($scope.contact);
  //   $http.put('/contactlist/' + $scope.contact._id, $scope.contact);
  // };


});
