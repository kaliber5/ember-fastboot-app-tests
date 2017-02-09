'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Acceptance: ember generate and destroy ember-fastboot-addon-tests', function() {
  setupTestHooks(this);

  it('fastboot-test foo', function() {
    let args = ['fastboot-test', 'foo'];

    // pass any additional command line options in the arguments array
    return emberNew()
      .then(() => emberGenerateDestroy(args, (file) => {
        expect(file('fastboot-tests/foo-test.js'))
          .to.contain('return this.visit(\'/foo\')');
      }));
  });
});
