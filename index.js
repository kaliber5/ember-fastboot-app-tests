/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-fastboot-app-tests',

  includedCommands() {
    return {
      'fastboot:test': require('./lib/commands/fastboot-test')
    };
  }
};
