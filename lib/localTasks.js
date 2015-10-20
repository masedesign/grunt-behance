var path = require('path');

exports.load = function(grunt, plugin) {
  var nestedTaskPath = path.join(__dirname, '..', 'node_modules', plugin, 'tasks');
  var dedupedTaskPath = path.join(__dirname, '..', '..', '..', 'node_modules', plugin, 'tasks');
  var taskPath;

  try {
    // try npm2 style nested depedencies first.
    require.resolve(nestedTaskPath);
    taskPath = nestedTaskPath;
  } catch(e) {
    // fallback to npm3 style nested depedencies.
    taskPath = dedupedTaskPath;
  }

  grunt.loadTasks(taskPath);
};
