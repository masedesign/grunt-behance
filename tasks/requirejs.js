var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-contrib-requirejs';

  localTasks.load(grunt, plugin);
};
