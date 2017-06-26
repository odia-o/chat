import angular from 'angular';
import 'angular-ui-router';
var app = angular.module("chat", ["ui.router"]);

app.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home')
    
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: "views/home.html",
        resolve: {
            homeService: function ($http) {
                return $http.get('/home');
            }
        },
        controller: function (homeService) {
            this.t = homeService.data;
        },
        controllerAs: 'homeCtrl'
    })
    .state('home.contact', {
        url: '/:contactName',
        templateUrl: "views/contact-chat.html",
        resolve: {
            contactService: function ($http, $stateParams) {
                return $http.get(`/home/${$stateParams.contactName}`);
            }
        },
        controller: function (contactService){
            this.messages = contactService.data;
        },
        controllerAs: 'contactCtrl'
    })
});


