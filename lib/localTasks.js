var path = require('path');

exports.load = function(grunt, plugin) {
  grunt.loadTasks(path.join(__dirname, '..', 'node_modules', plugin, 'tasks'));
};
