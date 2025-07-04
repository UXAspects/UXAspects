module.exports = {
  library: 'dist/library',
  styles: 'dist/styles',
  documentation: 'dist/docs',
  e2e: ['e2e/dist', 'target/e2e'],
  target: ['target/npm', 'target/artifactory', 'target/release-staging', 'target/docs'],
};
