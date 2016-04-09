var myApp = angular.module("myApp", []);
myApp.controller('AppCtrl', function($scope, $http) {

  $scope.model = {

    menus: [{
      name: "Breakfast"
    },
    {
      name: "Lunch"
    }],
    selectedMenu: {},

    items: [{
          name: "Pizza",
          price: 10
      }, {
          name: "Chicken",
          price: 15
      }, {
          name: "Salad",
          price: 32
      }]
  };

  $scope.onMenuClicked = function(menu){
    $scope.model.selectedMenu = menu;
  }

  $scope.isMenuSelected = function(menu){
    return angular.equals(menu,$scope.model.selectedMenu);
  }

  $scope.addMenu = function(){
      var newMenu = {name: ""}
      $scope.model.menus.push(newMenu);
  }

  $scope.deleteMenu = function(idx){
      if(angular.equals($scope.model.menus[idx],$scope.model.selectedMenu)){
          $scope.model.selectedMenu = {};
      }
      var removedMenu = $scope.model.menus.splice(idx,1);
  }

  $scope.addItem = function(){
      var newItem = {name: ""}
      $scope.model.items.push(newItem);
  }

  $scope.deleteItem = function(idx){
      var removedItem = $scope.model.items.splice(idx,1);
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
