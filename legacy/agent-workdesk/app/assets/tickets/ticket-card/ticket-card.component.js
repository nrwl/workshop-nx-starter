'use strict';

angular
  .module('tickets')
  .component('ticketCard', {
    template: `
      <section>
        <div><strong>{{$ctrl.tuskTicket.title}}</strong></div>
        <div>
          Submitted by:
          <a ng-click="$ctrl.onSubmittedBySelect({submittedBy: $ctrl.tuskTicket.submittedBy})">{{$ctrl.tuskTicket.submittedBy}}</a>
        </div>
        <div>
          Company: {{$ctrl.tuskTicket.company}}
          <span ng-if="$ctrl.userAssignedToCompany">*</span>
        </div>
        <ticket-activity tusk-ticket="$ctrl.tuskTicket"></ticket-activity>
      </section>
      <button
        class="notify-icon"
        ng-class="{on: $ctrl.notifyList.indexOf($ctrl.tuskTicket.id) >= 0}"
        ng-click="$ctrl.onNotifyToggle()">
        N
      </button>
    `,
    bindings: {
      tuskTicket: '<',
      notifyList: '=',
      onSubmittedBySelect: '&'
    },
    controller: ['userService', function (userService) {
        this.$onChanges = function () {
          this.userAssignedToCompany = userService.userAssignedToCompany(this.tuskTicket.company);
        };

        this.onNotifyToggle = function () {
          if (this.notifyList.indexOf(this.tuskTicket.id) >= 0) {
            this.notifyList.splice(this.notifyList.indexOf(this.tuskTicket.id), 1);
          } else {
            this.notifyList.push(this.tuskTicket.id);
          }
        };
      }
    ]
  });
