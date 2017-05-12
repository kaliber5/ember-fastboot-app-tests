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

        if (requestOptions.headers
          && requestOptions.headers.Accept
          && requestOptions.headers.Accept.indexOf('text/html')) {
          throw new Error('Accept header must include \'text/html\'');
        }
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
      requestOptions.headers = requestOptions.headers || {};
      if (!requestOptions.headers.Accept) {
        // We have to send the `Accept` header so the ember-cli server sees this as a request to `index.html` and sets
        // `req.serveUrl`, that ember-cli-fastboot needs in its middleware
        // See https://github.com/ember-cli/ember-cli/blob/master/lib/tasks/server/middleware/history-support/index.js#L55
        // and https://github.com/ember-fastboot/ember-cli-fastboot/blob/master/index.js#L160
        requestOptions.headers.Accept = 'text/html';
      }

      debug(`visiting ${url}`, requestOptions);
      return visit(requestOptions);
    };

    debug('Starting FastBoot server');
    app = new App(process.cwd());
    return app.startServer({
      port: port
    });

  });

  after(function() {
    debug('Stopping FastBoot server');
    return app.stopServer();
  });

}

module.exports = setupTestsForFastboot;