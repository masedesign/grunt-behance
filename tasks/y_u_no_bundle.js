var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-y-u-no-bundle';

  localTasks.load(grunt, plugin);
};
