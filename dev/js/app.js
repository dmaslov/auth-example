(function(angular) {
  'use strict';

  angular
    .module('myApp', ['ngRoute'])
    .directive('auth', function() {
      var directive = {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: '/partial/auth-template.html',
        controller: authController,
        controllerAs: 'authCtrl',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        scope.authCtrl.getUserDetails();

        scope.$on('auth', function(event, response) {
          if(response.authResponse.access_token){
            scope.authCtrl.getUserDetails();
            scope.$apply(function(){
              scope.isAuthorized = true;
            });
          }
        });
      }

      function authController($scope, AuthFactory) {
        var vm = this;
        $scope.isAuthorized = false;

        vm.login = function(provider) {
          AuthFactory.login(provider);
        };

        vm.logout = function(provider) {
          AuthFactory.logout(provider);
          $scope.isAuthorized = false;
        };

        vm.getUserDetails = function() {
          var authData = AuthFactory.getAuthResponse('twitter');
          if(authData){
            vm.userName = authData.screen_name;
            $scope.isAuthorized = true;
          }
        };
      }
    })
    .factory('AuthFactory', function($window, $rootScope) {
      var hello = $window.hello;
      var isInited = false;
      var service = {
        login: login,
        getAuthResponse: getAuthResponse,
        logout: logout
      };

      return service;

      function login(provider) {
        init();
        hello(provider).login().then(function(response) {
          $rootScope.$broadcast('auth', response);
        });
      }

      function getAuthResponse(provider) {
        return hello(provider).getAuthResponse();
      }

      function logout(provider) {
        hello(provider).logout();
      }


      function init() {
        if (!isInited) {
          hello.init({twitter: 'client_id_here'}, {
            redirect_uri: '/redirect',
            oauth_proxy: '/proxy'
          });

          isInited = !isInited;
        }
      }
    });
})(angular);
