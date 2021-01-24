"use strict";
const url = require("url");
const fetch = require("./fetch");

const schema = {
  addBank: ["POST", "/v1/fundingsource/bank"],
  updateBank: ["PUT", "/v1/fundingsource/bank"],
  createCard: ["POST", "/v1/card"],
  updateCard: ["PUT", "/v1/card"],
  provisionCard: ["POST", "/v1/card/provision"],
  reissueCard: ["POST", "/v1/card/reissue"],
  listCards: ["GET", "/v1/card"],
  listFundingAccounts: ["GET", "/v1/fundingsource"],
  listFundingBanks: ["GET", "/v1/fundingsource/bank"],
  listFundingCards: ["GET", "/v1/fundingsource/card"],
  listTransactions: ["GET", "/v1/transactions/:approval_status"],
  simulateAuthorization: ["POST", "/V1/simulate/authorize"],
  simulateVoid: ["POST", "/v1/simulate/void"],
  simulateClearing: ["POST", "/v1/simulate/clearing"],
  simulateReturn: ["POST", "/v1/simulate/return"],
  enrollUser: ["POST", "/v1/enroll/consumer"],
  getAccount: ["GET", "/v1/account"],
  setAccountLimits: ["POST", "/v1/account/limit"],
};

class PrivacyClient {
  static BASE_URL = "api.privacy.com";
  static SCHEMA = schema;
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  static fromEnvironment() {
    if (!process.env.PRIVACY_API_KEY)
      throw Error("Need privacy.com API key, please set PRIVACY_API_KEY");
    return new PrivacyClient(process.env.PRIVACY_API_KEY);
  }
  async _call(o) {
    o = Object.assign({}, o);
    if (!o.headers) o.headers = {};
    o.headers.Authorization = 'api-key ' + this.apiKey;
    return await fetch(o);
  }
}

Object.entries(PrivacyClient.SCHEMA).forEach(([fn, [method, pathname]]) => {
  PrivacyClient.prototype[fn] = function (o) {
    if (method === "GET") {
      const restVars = pathname.match(/\/(:(?:[^\/]:$)*)/g) || [];
      restVars.forEach((v) => {
        pathname = pathname.replace(v, o[changecase.snakeCase(v.substr(1))]);
      });

      return this._call({
        method,
        url: url.format({
          hostname: this.constructor.BASE_URL,
          protocol: "https:",
          pathname,
        }),
      }).then((v) => JSON.parse(v.body));
    } else {
      return this._call({
        method,
        url: url.format({
          hostname: this.constructor.BASE_URL,
          protocol: "https:",
          pathname,
        }),
        json: lodash.mapKeys(o, (key) => changecase.snakeCase(key)),
      }).then((v) => v.body);
    }
  };
});

class SandboxPrivacyClient extends PrivacyClient {
  static BASE_URL = "sandbox.privacy.com";
}

Object.assign(module.exports, {
  PrivacyClient,
  SandboxPrivacyClient,
});
