'use strict';

const path = require('path');
const App = require('ember-cli-addon-tests').App;
const visit = require('./visit');
const debug = require('debug')('ember-fastboot-app-tests');

const port = 49741;

function setupTestsForFastboot(/* options */) {

  let app;

  before(function() {

    this.visit = function(requestOptions) {
      let url = requestOptions;
      if (typeof requestOptions === 'object') {
        url = requestOptions.uri || requestOptions.url;
      }
      if (typeof url === 'undefined') {
        throw new Error('visit helper was called without URL. Either pass a string or an object containing an `url` key.');
      }

      if (!url.match(/^https?:\/\//)) {
        let host = `http://localhost:${port}`;
        let separator = url.charAt(0) === '/' ? '' : '/';
        url = host + separator + url;
      }

      requestOptions = Object.assign({}, typeof requestOptions === 'object' ? requestOptions : {}, { url });
      delete requestOptions.uri;

      debug(`visiting ${url}`);
      return visit(requestOptions);
    };

    debug('Starting FastBoot server');
    app = new App(process.cwd());
    return app.startServer({
      command: 'fastboot',
      port: port
    });

  });

  after(function() {
    debug('Stopping FastBoot server');
    return app.stopServer();
  });

}

module.exports = setupTestsForFastboot;