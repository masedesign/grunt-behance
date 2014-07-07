var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-jscs';

  localTasks.load(grunt, plugin);
};
