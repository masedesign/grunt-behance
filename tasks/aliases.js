module.exports = function(grunt) {
  grunt.registerTask('sniff', ['jscs:main']);
  grunt.registerTask('lint', ['jshint', 'jscs:main', 'y_u_no_bundle', 'build_lint']);
  grunt.registerTask('test', ['lint', 'karma:single']);

  grunt.registerTask('js', ['test']);
  grunt.registerTask('css', ['scsslint']);
  grunt.registerTask('php', ['phpunit:unit']);
};
