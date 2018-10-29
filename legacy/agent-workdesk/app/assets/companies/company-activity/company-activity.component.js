'use strict';

angular
  .module('companies')
  .component('companyActivity', {
    template: `
      <a class="activity-link"
        ng-click="$ctrl.toggleActivity()" 
        ng-class="{open: $ctrl.activityVisible}">
        Activity
      </a>
      <div ng-if="$ctrl.activityVisible">
        <p class="entry" ng-repeat="entry in $ctrl.companyActivity">{{entry}}</p>
      </div>
    `,
    bindings: {
      tuskCompany: '<'
    },
    controller: ['companyService', function(companyService) {
      this.activityVisible = false;

      this.$onChanges = function () {
        this.companyActivity = companyService.getActivity(this.tuskCompany.id);
      };

      this.toggleActivity = function() {
        this.activityVisible = !this.activityVisible;
      };
    }]
  });