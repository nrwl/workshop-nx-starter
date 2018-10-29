'use strict';

angular
  .module('companies')
  .service('teamService', function () {
    var _team = {
      name: 'Sea Unicorns',
      companies: ['ABC Corp', 'Disco Distro']
    };

    return {
      currentTeam: function () {
        return _team.name;
      },
      teamAssignedToCompany: function (company) {
        return _team.companies.indexOf(company) >= 0;
      }
    };
  });
