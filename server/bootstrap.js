'use strict';

module.exports = async ({ strapi }) => {
  const pluginStore = strapi.store({
    environment: '',
    type: 'plugin',
    name: 'custom-fields',
  });
  const settings = await pluginStore.get({key: 'settings'});

  if (!settings) {
    const value = {
      enabled: true,
      googleAPI: '',
    };

    await pluginStore.set({key: 'settings', value});
  }
};
