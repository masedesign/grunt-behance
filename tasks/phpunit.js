var localTasks = require('../lib/localTasks');

module.exports = function(grunt) {
  var plugin = 'grunt-phpunit';

  localTasks.load(grunt, plugin);
};
