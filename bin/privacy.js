'use strict';

const { PrivacyClient } = require('../lib/privacy');

const yargs = require('yargs');

let { argv } = yargs;

const util = require('util');
const options = argv.options || {};
const lodash = require('lodash');
const debug = options.debug || options.d
const changecase = require('change-case');

argv = argv._;

delete options.debug;
delete options._;

const privacyClient = PrivacyClient.fromEnvironment();

(async () => {
  const command = changecase.camelCase(argv[0]);
  const result = await privacyClient[command](lodash.mapKeys(options, (key) => changecase.camelCase(key)));
  console.log(util.inspect(result, { colors: true, depth: 15 }));
})().catch(console.error)
