var Mocha = require('mocha'),
paige = require('be-paige'),

/*
 * argv[2] is first sent arg: Paige config
 * argv[3] is second sent arg: Polka config
 */
config = JSON.parse(process.argv[2]),
options = JSON.parse(process.argv[3]);

paige.config.set(config);

function cleanup() {
  // Removes selenium wd testing from module cache
  // Due to caching wrapped Mocha globals
  delete require.cache[require.resolve('be-paige/bescribe')];
  delete require.cache[require.resolve('be-paige/node_modules/selenium-webdriver/testing')];
}

process.on('message', function(filename) {
  var mocha = new Mocha(options);
  mocha.addFile(filename);
  mocha.run(function(err) {
    cleanup();
    process.send(err);
  });
});
