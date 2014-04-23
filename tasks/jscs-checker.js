var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-jscs-checker';

  localTasks.load(grunt, plugin);
};
