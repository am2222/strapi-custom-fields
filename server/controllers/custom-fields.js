'use strict';
const _ = require("lodash");

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-custom-fields')
      .service('myService')
      .getWelcomeMessage();
  },
  async getSettings(ctx) {
    ctx.send({
      settings: await strapi
        .store({
          environment: '',
          type: 'plugin',
          name: 'custom-fields',
          key: 'settings',
        })
        .get(),
    });
  },

  async updateSettings(ctx) {
    if (_.isEmpty(ctx.request.body)) {
      return ctx.badRequest(null, [{ messages: [{ id: 'Cannot be empty' }] }]);
    }

    await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'custom-fields',
        key: 'settings',
      })
      .set({ value: ctx.request.body });

    ctx.send({ ok: true });
  },
};
