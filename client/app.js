angular.module('app', [])

.controller('MainController', function($scope, CoffeeFind){

  $scope.findCoffee = function () {
    CoffeeFind.displayMap();
  };
  
})

.factory('CoffeeFind', function(){

  var displayMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 13
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here.');
        map.setCenter(pos);
    
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: map.getCenter(),
          radius: 10000,
          name: ['coffee', 'cafe']
        }, callback);
      
        function callback(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(place.name + '<br>' + place.vicinity);
            infoWindow.open(map, this);
          });
        }
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }
  };

  return {
    displayMap: displayMap, 
  }
})


