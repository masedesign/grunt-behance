var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-contrib-jshint';

  localTasks.load(grunt, plugin);
};
