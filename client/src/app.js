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
            //console.log(this.t);
        },
        controllerAs: 'homeCtrl'
    })
    .state('home.contact', {
        url: '/contact/:contactName',
        templateUrl: "views/contact-chat.html",
        resolve: {
            contactService: function ($http, $stateParams) {
                return $http.get(`/home/contact/${$stateParams.contactName}`);
            }
        },
        controller: function (contactService, $http, $stateParams, $state){
            this.messages = contactService.data.messages;
            //console.log(this.messages.messages);
            this.saveMessage = function (message) {
                $http({
                    method: 'POST',
                    url: `/home/contact/${$stateParams.contactName}`,
                    data: {
                        message: message
                    }
                }).then(function () {
                    $state.go('home.contact', {
                        contactName: $stateParams.contactName
                    }, {reload: true});
                });
            };
            
        },
        controllerAs: 'contactCtrl'
    })
    .state('home.group', {
        url: '/group/:groupName',
        templateUrl: "views/group-chat.html",
        resolve: {
            groupService: function ($http, $stateParams) {
                return $http.get(`/home/group/${$stateParams.groupName}`);
            }
        },
        controller: function (groupService, $http, $stateParams, $state){
            this.messages = groupService.data.messages;
            //console.log(this.messages.messages);
            this.saveMessage = function (message) {
                $http({
                    method: 'POST',
                    url: `/home/group/${$stateParams.groupName}`,
                    data: {
                        message: message
                    }
                }).then(function () {
                    $state.go('home.group', {
                        groupName: $stateParams.groupName
                    }, {reload: true});
                });
            };
            
        },
        controllerAs: 'groupCtrl'
    })
});


