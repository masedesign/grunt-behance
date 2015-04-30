var buildLayerLint = require('build-layer-lint');

module.exports = function(grunt) {
  grunt.registerTask('build_lint', 'Check that build layers defined in build.json exist', function() {
    var options = this.options({});

    var buildLayerLocation = options.buildConfig;
    var moduleRootLocation = options.moduleRoot;
    var ignore = options.ignore || [];

    var missingModules = buildLayerLint(buildLayerLocation, moduleRootLocation);
    missingModules = missingModules.filter(function(module) {
      return !~ignore.indexOf(module);
    });

    missingModules.forEach(function(module) {
      grunt.fail.warn("Found missing module: '" + module + "'\n");
    });
  });
};
