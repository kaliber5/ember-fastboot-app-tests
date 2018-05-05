'use strict';

const RSVP = require('rsvp');
const request = RSVP.denodeify(require('request'));
const jsdom = require('jsdom');
const jQuery = require('jquery');

const { JSDOM } = jsdom;

// ignore external resources
jsdom.defaultDocumentFeatures = {
  FetchExternalResources: false,
  ProcessExternalResources: false
};

function visit(opts) {
  return request(opts)
    .then(function(response) {
      let { window } = new JSDOM(response.body);
      let jq = jQuery(window);

      return {
        response: response,
        jQuery: jq
      };
    });
}

module.exports = visit;