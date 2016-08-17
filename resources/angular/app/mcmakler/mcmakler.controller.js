(function () {
  'use strict';

  angular.module('mcmakler')
    .controller('FormCtrl', formController)
  ;

  function formController($scope, $timeout, GeocodeService)
  {
    $scope.address = {
      postalCode: 'SW1 1AB'
    };

    $scope.isFormValid = true;
    $scope.formState = 0;  // 0 = clean, 1 = saving, 2 = saved
    $scope.successMessage = '';
    $scope.failMessage = '';

    function geoCodeSuccess(response)
    {
      $scope.isFormValid = true;
      $scope.formState = 2;
      var location = response.locations[0].geometry.location;
      $scope.successMessage = 'The coordinates for this address are: {{lat}}, {{lng}}'
        .replace(/{{lat}}/g, location.lat).replace(/{{lng}}/g, location.lng);

      // For animation
      $timeout(function() {
        $scope.failMessage = '';
      }, 400);
    }

    function geoCodeFail(response)
    {
      $scope.isFormValid = false;
      $scope.formState = 2;
      $scope.failMessage = 'Invalid location';

      // For animation
      $timeout(function() {
        $scope.successMessage = '';
      }, 400);
    }

    $scope.save = function ()
    {
      $scope.formState = 1;
      var address = $scope.address;
      GeocodeService.query({
        address: [address.houseNumber, address.street, address.postalCode, address.city]
        .filter(function (val) { return val; })
        .join('+')
      }, geoCodeSuccess, geoCodeFail);
    }
  }

})();
