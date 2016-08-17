(function () {
    'use strict';

    angular.module('app')
        .config(appConfig)
    ;

    function appConfig($stateProvider, $urlRouterProvider, geocodeConfig)
    {
      $urlRouterProvider.otherwise('/form');

      $stateProvider
        .state('form', {
          url: '/form',
          templateUrl: '/form.html'
        });

      geocodeConfig.apiKey = 'AIzaSyCpmIgdrJ7jVilTFnl8g3Upz0JrbIHc4W8';
    }

})();
