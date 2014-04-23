var fs = require('fs');

module.exports = function(grunt) {
  var file = grunt.file;

  grunt.registerTask('unswap', 'Replace with raw assets', function() {
    if (file.isDir('public/assets-raw')) {
      file["delete"]('public/assets');

      fs.renameSync('public/assets-raw', 'public/assets');
    }
  });

  grunt.registerTask('swap', 'Swap assets directories', function() {
    var built = grunt.config('options.buildDir');

    if (!file.isDir('public/assets-raw')) {
      fs.renameSync('public/assets', 'public/assets-raw');
    }

    if (file.isDir('public/assets')) {
      file["delete"]('public/assets');
    }

    fs.renameSync(built, 'public/assets');
  });
};
