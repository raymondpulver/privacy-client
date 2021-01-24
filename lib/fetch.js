'use strict';

const request = require('request');

const yargs = require('yargs');

const { debug, d } = yargs.options;

if (debug || d) require('request-debug')(request);

const fetch = async (o) => await new Promise((resolve, reject) => {
  request(o, (err, resp) => {
    if (err) return reject(err);
    resolve(resp);
  });
});

module.exports = fetch;
