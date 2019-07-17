module.exports = {
  name: 'logs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/logs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
