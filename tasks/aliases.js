module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.registerTask('sniff', ['jscs:main']);
  grunt.registerTask('lint', ['jshint', 'jscs:main', 'build_lint']);
  grunt.registerTask('test', ['lint', 'karma:single']);

  grunt.registerTask('js', ['test']);
  grunt.registerTask('css', ['scsslint']);
  grunt.registerTask('php', ['phpunit:unit']);
};
