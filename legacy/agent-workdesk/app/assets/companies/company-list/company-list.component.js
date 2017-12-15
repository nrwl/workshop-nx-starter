'use strict';

angular
  .module('companies')
  .component('companyList', {
    template: `
      <header class="list-header">
        <div>
          <div class="list-title">Companies</div>
          <a ng-click="$ctrl.onFilterChange({filter: ''})">Clear Group Filter</a>
        </div>
        <div class="notification-summary">
          <div>({{$ctrl.notifyList.length}}) active notifications</div>
          <a ng-click="$ctrl.onNotifyAll()">Notify All</a>
        </div>
      </header>
      <company-card
        class="card"
        ng-repeat="tuskCompany in $ctrl.tuskCompanies"
        tusk-company="tuskCompany"
        notify-list="$ctrl.notifyList"
        on-group-select="$ctrl.onGroupSelected(groupName)"></company-card>
    `,
    bindings: {
      tuskCompanies: '<',
      onFilterChange: '&'
    },
    controller: function () {
      this.notifyList = [];

      this.onNotifyAll = function () {
        this.notifyList = this.tuskCompanies.map(function (t) {
          return t.id;
        });
      };

      this.onGroupSelected = function (groupName) {
        this.onFilterChange({filter: groupName});
      };
    }
  });
