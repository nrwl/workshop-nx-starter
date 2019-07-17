module.exports = {
  name: 'client-logs-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/client/logs/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
