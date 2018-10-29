'use strict';

angular
  .module('tickets')
  .component('ticketOverview', {
    template: `
      <p class="overview-message">Tickets assigned to {{$ctrl.currentUserName}}</p>
      <ticket-list
        class="list"
        tusk-tickets="$ctrl.tickets"
        on-filter-change="$ctrl.onFilterChanged(filter)"></ticket-list>
    `,
    controller: ['userService', function (userService) {
        this.currentUserName = userService.currentUser();
        this._tickets = [
          {id: 1, title: 'Need help with UI', submittedBy: 'Mary', company: 'ABC Corp'},
          {id: 2, title: 'Submit not working', submittedBy: 'Ned', company: 'Priority Gems'},
          {id: 3, title: 'How do I upload files?', submittedBy: 'Bob', company: 'ABC Corp'},
          {
            id: 4,
            title: 'Schedule a video call for training',
            submittedBy: 'Mary',
            company: 'ABC Corp'
          },
          {id: 5, title: 'Minor issue with layout', submittedBy: 'Jules', company: 'Priority Gems'}
        ];
        this.tickets = this._tickets;

        this.onFilterChanged = function (filter) {
          this.tickets = this._tickets.filter(function (t) {
            return filter === '' || t.submittedBy === filter;
          });
        }
      }
    ]
  });