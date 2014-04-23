var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-karma';

  localTasks.load(grunt, plugin);
};
