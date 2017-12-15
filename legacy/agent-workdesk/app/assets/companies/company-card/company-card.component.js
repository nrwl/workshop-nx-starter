'use strict';

angular
  .module('companies')
  .component('companyCard', {
    template: `
      <section>
        <div><strong>{{$ctrl.tuskCompany.name}}</strong></div>
        <div>
          Group:
          <a ng-click="$ctrl.onGroupSelect({groupName: $ctrl.tuskCompany.group})">{{$ctrl.tuskCompany.group}}</a>
        </div>
        <company-activity tusk-company="$ctrl.tuskCompany"></company-activity>
      </section>
      <button
        class="notify-icon"
        ng-class="{on: $ctrl.notifyList.indexOf($ctrl.tuskCompany.id) >= 0}"
        ng-click="$ctrl.onNotifyToggle()">
        N
      </button>
    `,
    bindings: {
      tuskCompany: '<',
      notifyList: '=',
      onGroupSelect: '&'
    },
    controller: ['teamService', function (teamService) {
      this.$onChanges = function () {
        this.teamAssignedToCompany = teamService.teamAssignedToCompany(this.tuskCompany.name);
      };

      this.onNotifyToggle = function () {
        if (this.notifyList.indexOf(this.tuskCompany.id) >= 0) {
          this.notifyList.splice(this.notifyList.indexOf(this.tuskCompany.id), 1);
        } else {
          this.notifyList.push(this.tuskCompany.id);
        }
      };
    }]
  });
