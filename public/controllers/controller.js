var myApp = angular.module("myApp", []);
myApp.controller('AppCtrl', function($scope, $http) {

  $scope.model = {
    items: [{
          name: "Pizza",
          price: 10
      }, {
          name: "Chicken",
          price: 15
      }, {
          name: "Salad",
          price: 32
      }],
      selectedItem: {},
      selectedIndex: -1
  };

  // gets the template to ng-include for a table row / item
  $scope.getTemplate = function (idx) {
      if (idx === $scope.model.selectedIndex) return 'edit';
      else return 'display';
  };

  $scope.editItem = function (item, idx) {
      $scope.model.selectedItem = angular.copy(item);
      $scope.model.selectedIndex = idx;
  };

  $scope.saveItem = function (idx) {
      $scope.model.items[idx] = angular.copy($scope.model.selectedItem);
      $scope.reset();
  };

  $scope.reset = function () {
      $scope.model.selectedItem = {};
      $scope.model.selectedIndex = -1;
  };

  $scope.addItem = function(){
      var newItem = {name: "",price: ""}
      $scope.model.items.push(newItem);
      $scope.editItem(newItem,$scope.model.items.length-1);
  }

  $scope.deleteItem = function(idx){
      var removedItem = $scope.model.items.splice(idx,1);
      $scope.reset();
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
