var myApp = angular.module("myApp", []);
myApp.controller('AppCtrl', function($scope, $http) {

  var refresh = function() {
    $http.get('/contactlist').success(function(response) {
      $scope.contactlist = response;
      $scope.contact = '';
    });

  };

  refresh();
  //$scope.contactlist = contactlist;

  $scope.addContact = function() {
    $http.post('/contactlist', $scope.contact).success(
      function(response) {
        console.log(response);
        refresh();
      }
    );

  };


  $scope.remove = function(contact) {
    console.log(contact);
		console.log("ANGULAR message - remove");
    //$http.delete('/contactlist/' + id);

    $http.post('/contactlist/delete', contact).success(
      function(response) {
        refresh();
      }
    );

  };

  $scope.edit = function(contact) {
    $scope.contact = contact;
  };

  $scope.update = function() {
    console.log($scope.contact);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact);
  };


});
