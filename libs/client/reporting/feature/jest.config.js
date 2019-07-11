module.exports = {
  name: 'reporting-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/reporting/feature',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
