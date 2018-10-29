'use strict';

angular
  .module('tickets')
  .service('ticketService', function () {
    let _activity = [
      {id: 1, entry: 'created via web client'},
      {id: 1, entry: 'changed company link'},
      {id: 1, entry: 'updated title'},
      {id: 2, entry: 'created via web client'},
      {id: 3, entry: 'created via mobile client'},
      {id: 4, entry: 'created in admin'},
      {id: 5, entry: 'created via web client'}
    ];

    return {
      getActivity: function (id) {
        return _activity
          .filter(function(a) { return a.id === id; })
          .map(function(a) { return a.entry; });
      }
    };
  });
