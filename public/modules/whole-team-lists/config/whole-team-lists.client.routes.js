'use strict';

//Setting up route
angular.module('whole-team-lists').config(['$stateProvider',
    function ($stateProvider) {
        // Whole team lists state routing
        $stateProvider.
            state('listWholeTeamLists', {
                url: '/whole-team-lists',
                templateUrl: 'modules/whole-team-lists/views/list-whole-team-lists.client.view.html'
            }).
            state('listPaidTeamLists', {
                url: '/paid-team-lists',
                templateUrl: 'modules/whole-team-lists/views/list-paid-team-lists.client.view.html'
            }).
            state('listTeamList2009Lists', {
                url: '/team-rev2009-lists',
                templateUrl: 'modules/whole-team-lists/views/list-teamwalkrev2009-lists.client.view.html'
            }).
            state('listPaidTeamSummaryLists', {
                url: '/paid-team-summary-lists',
                templateUrl: 'modules/whole-team-lists/views/list-paid-team-summary-lists.client.view.html'
            }).
            state('createWholeTeamList', {
                url: '/whole-team-lists/create',
                templateUrl: 'modules/whole-team-lists/views/create-whole-team-list.client.view.html'
            }).
            state('viewWholeTeamList', {
                url: '/whole-team-lists/:wholeTeamListId',
                templateUrl: 'modules/whole-team-lists/views/view-whole-team-list.client.view.html'
            }).
            state('editWholeTeamList', {
                url: '/whole-team-lists/:wholeTeamListId/edit',
                templateUrl: 'modules/whole-team-lists/views/edit-whole-team-list.client.view.html'
            });
    }
]);
