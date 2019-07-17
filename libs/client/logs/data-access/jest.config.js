module.exports = {
  name: 'client-logs-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/client/logs/data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
