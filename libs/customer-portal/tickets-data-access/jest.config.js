module.exports = {
  name: 'customer-portal-tickets-data-access',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/customer-portal/tickets-data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
