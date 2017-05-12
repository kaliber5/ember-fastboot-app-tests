'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'fastboot:test',
  description: 'Run your Fastboot tests',

  availableOptions: [
    {
      name: 'reporter',
      type: String,
      aliases: ['r'],
      description: 'Mocha test reporter to use',
      default: 'spec'
    },
    {
      name: 'timeout',
      type: Number,
      aliases: ['t'],
      description: 'Mocha test timeout (in ms)',
    }
  ],

  run(options) {
    let checker = new VersionChecker(this);
    checker.for('ember-cli-fastboot').assertAbove('1.0.0-beta.16');

    let TestTask = require('../tasks/test');

    let testTask = new TestTask({
      ui: this.ui
    });

    return testTask.run(options);
  }
};
