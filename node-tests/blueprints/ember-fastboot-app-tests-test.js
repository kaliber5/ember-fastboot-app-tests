'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Acceptance: ember generate and destroy ember-fastboot-app-tests', function() {
  setupTestHooks(this);

  it('ember-fastboot-app-tests', function() {
    let args = ['ember-fastboot-app-tests', 'foo'];

    // pass any additional command line options in the arguments array
    return emberNew()
      .then(() => emberGenerateDestroy(args, (file) => {
        expect(file('fastboot-tests/index-test.js'))
          .to.contain('return this.visit(\'/\')');
    }));
  });
});
