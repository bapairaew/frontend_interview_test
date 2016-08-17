(function () {
  'use strict';

  angular.module('geocode')
  .factory('GeocodeService', service)
  .constant('geocodeConfig', {
    apiKey: ''
  })
  ;

  function service($resource, $log, geocodeConfig)
  {
    if (!geocodeConfig.apiKey)
    {
      $log.warn('Geocode API KEY is empty.');
    }

    function transformResponse(data)
    {
      var response = angular.fromJson(data);
      return {
        locations: response.results
      };
    }

    return $resource('https://maps.googleapis.com/maps/api/geocode/json?key=' + geocodeConfig.apiKey, null,
    {
      'query': { method:'GET', transformResponse: transformResponse, isArray: false }
    });
  }

})();
