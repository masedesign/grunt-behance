var localTasks = require('../lib/localTasks');

var seleniumPlatform = {
  win32: 'WINDOWS',
  darwin: 'MAC',
  linux: 'LINUX',
  freebsd: 'LINUX'
};

module.exports = function(grunt) {
  var e, genPaigeCommand, paige;

  localTasks.load(grunt, 'grunt-shell');

  genPaigeCommand = function(command, hostAddr, dir, suite) {
    var mochaOpts, paigeOpts, parallelOpts, remoteConfigs, webdriverAddr;

    console.log(command, hostAddr, dir);

    hostAddr = "" + (!/[a-z](?:[a-z0-9+\-.])*:\/\//i.test(hostAddr) ? 'http://' : void 0) + hostAddr;
    dir = "'" + dir + "'";

    if (command === 'remote') {
      webdriverAddr = grunt.option('webdriverUrl');

      if (!webdriverAddr) {
        grunt.fail.warn("Required webdriver address missing.");
      }

      webdriverAddr = "" + (!/[a-z](?:[a-z0-9+\-.])*:\/\//i.test(webdriverAddr) ? 'http://' : void 0) + webdriverAddr;
    }

    remoteConfigs = [
      grunt.option('webdriverPlatform') ? "--webdriverPlatform " + (grunt.option('webdriverPlatform')) : void 0,
      grunt.option('webdriverBrowser') ? "--webdriverBrowser " + (grunt.option('webdriverBrowser')) : void 0,
      grunt.option('webdriverVersion') ? "--webdriverVersion " + (grunt.option('webdriverVersion')) : void 0
    ].join(' ');

    mochaOpts = [
      grunt.option('bail') ? "--bail" : void 0,
      "--slow 30000",
      "--timeout 20000",
      "--ui bdd",
      grunt.option('grep') ? "--grep " + (grunt.option('grep')) : void 0,
      suite !== "undefined" ? "--grep :" + suite + ":" : void 0
    ].join(' ');

    if (grunt.option('additionalConfigs')) {
      paigeOpts = "--additional-config " + (grunt.option('additionalConfigs'));
    }

    if (grunt.option('parallel')) {
      parallelOpts = "-p";
    }

    command = [
      './node_modules/.bin/paige',
      command,
      hostAddr,
      webdriverAddr,
      dir,
      paigeOpts || '',
      remoteConfigs || '',
      mochaOpts || '',
      parallelOpts || '',
      '--colors'
    ];

    grunt.log.writeln("Running command: " + (command.join(' ')));

    return command.join(' ');
  };

  grunt.registerTask('paige', 'Run Paige tests', function() {
    var address, files, suite, target, webdriverAddress, webdriverBrowser, webdriverPlatform, webdriverVersion;
    var options = this.options({
      files: 'spec/**/*.js'
    });

    address = this.args[0] || grunt.option('appUrl');

    if (!address) {
      grunt.fail.warn("Required application address missing.");
    }

    webdriverAddress = grunt.option('webdriverUrl') || 'local';
    webdriverPlatform = grunt.option('webdriverPlatform') || 'local';
    webdriverBrowser = grunt.option('webdriverBrowser') || 'firefox';
    webdriverVersion = grunt.option('webdriverVersion') || '';

    grunt.log.writeln("Application URI: " + address);
    grunt.log.writeln("WebDriver target: " + webdriverAddress);
    grunt.log.writeln("WebDriver platform: " + webdriverPlatform);
    grunt.log.writeln("WebDriver browser: " + webdriverBrowser);
    grunt.log.writeln("WebDriver version: " + webdriverVersion);
    grunt.log.writeln('');
    grunt.log.writeln('            （ヽ,,');
    grunt.log.writeln('　＿,,,,,,,))))ヽ,i彡');
    grunt.log.writeln('（・ |　　　●    彡ﾐ');
    grunt.log.writeln(' ＞イ|　　　　　  彡ﾐ');
    grunt.log.writeln('　￣￣￣ヽ_　   彡彡ﾐ');
    grunt.log.writeln('　　 　　／　　   彡ﾐ');
    grunt.log.writeln('　　    ∠ ＿＿   彡ﾐ');
    grunt.log.writeln('');

    files = options.files;
    target = this.args[1] || 'local';
    suite = this.args[2];

    if (grunt.option("grep") && (suite != null)) {
      grunt.fail.warn("Cannot grep and run a suite at the same time.");
    }

    grunt.task.run("shell:paige:" + target + ":" + address + ":" + files + ":" + suite);
  });

  grunt.config.set('shell', {
    paige: {
      options: {
        stdout: true,
        stderr: true
      },
      command: genPaigeCommand
    }
  });
};
