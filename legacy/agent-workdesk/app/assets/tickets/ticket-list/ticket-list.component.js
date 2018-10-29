'use strict';

angular
  .module('tickets')
  .component('ticketList', {
    template: `
      <header class="list-header">
        <div>
          <div class="list-title">Tickets</div>
          <a ng-click="$ctrl.onFilterChange({filter: ''})">Clear Submitted By Filter</a>
        </div>
        <div class="notification-summary">
          <div>({{$ctrl.notifyList.length}}) active notifications</div>
          <a ng-click="$ctrl.onNotifyAll()">Notify All</a>
        </div>
      </header>
      <ticket-card
        class="card"
        ng-repeat="tuskTicket in $ctrl.tuskTickets"
        tusk-ticket="tuskTicket"
        notify-list="$ctrl.notifyList"
        on-submitted-by-select="$ctrl.onSubmittedBySelected(submittedBy)"></ticket-card>
    `,
    bindings: {
      tuskTickets: '<',
      onFilterChange: '&'
    },
    controller: function () {
        this.notifyList = [];

        this.onNotifyAll = function () {
          this.notifyList = this.tuskTickets.map(function (t) {
            return t.id;
          });
        };

        this.onSubmittedBySelected = function (submittedBy) {
          this.onFilterChange({filter: submittedBy});
        };
      }

  });