/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1693918592380_1678';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,POST,DELETE,PATCH'
  }

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'Chat9527',
      database: 'chatDB',
    },
    app: true,
    agent: false,
  }

  config.validate = {
    convert: true,
    widelyUndefined: true,
    async formatter(ctx, error) {
      ctx.status = 400;
      ctx.body = {
        code: 'INVALID_PARAM',
        errors: error.errors,
      };
    },
  }

  config.constant = {
    API_KEY: 'you apiKey',
  };
  

  return config;
};
