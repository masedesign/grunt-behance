var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-scss-lint';

  localTasks.load(grunt, plugin);
};
