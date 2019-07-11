module.exports = {
  name: 'customer-portal-tickets-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/customer-portal/tickets-feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
