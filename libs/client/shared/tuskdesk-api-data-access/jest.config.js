module.exports = {
  name: 'client-tuskdesk-api-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/client/tuskdesk-api-data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
