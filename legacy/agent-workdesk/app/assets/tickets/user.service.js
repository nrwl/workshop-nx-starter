'use strict';

angular
  .module('tickets')
  .service('userService', function () {
    var _user = {
      name: 'Samantha',
      companies: ['ABC Corp']
    };

    return {
      currentUser: function () {
        return _user.name;
      },
      userAssignedToCompany: function (company) {
        return _user.companies.indexOf(company) >= 0;
      }
    };
  });
