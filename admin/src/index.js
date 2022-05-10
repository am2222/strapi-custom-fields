import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import ColorPicker from './components/ColorPicker';
import GoogleGeocoder from './components/GoogleGeocoder';
import {getTrad} from './utils/getTrad'
const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
const name = pluginPkg.strapi.name;
/*
  Since strapi doesn't support custom fields in v4, we have to overwrite the current implementation
*/
import { intercept } from './utils/intercept';
import * as helperPlugin from '@strapi/helper-plugin';
intercept(helperPlugin, 'GenericInput', ({ args: [props], resolve }) => {
  const type = (props.attribute || {}).fieldRenderer || props.type;
  return resolve({
    ...props,
    type,
  });
});


export default {
  register(app) {
    app.addFields({ type: 'colorpicker', Component: ColorPicker });
    app.addFields({ type: 'googlegeocoder', Component: GoogleGeocoder });
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: getTrad('Header.Settings'),
          defaultMessage: 'Custom Fields',
        },
      },
      [
        {
          intlLabel: {
            id: getTrad('Form.title.Settings'),
            defaultMessage: 'Settings',
          },
          id: 'custom-fields-settings',
          to: `/settings/${pluginId}`,
          Component: async () => {
            return await import(
              /* webpackChunkName: "password-settings-page" */ './pages/Settings'
              );
          },
          permissions: [],
        },
      ]
    );
    app.registerPlugin({
      id: pluginId,
      description: pluginDescription,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
