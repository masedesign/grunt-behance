var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-contrib-clean';

  localTasks.load(grunt, plugin);
};
