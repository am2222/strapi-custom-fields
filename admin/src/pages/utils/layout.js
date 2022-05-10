import {getTrad} from '../../utils/getTrad';

const layout = [
  {
    intlLabel: {
      id: getTrad('Settings.googleAPI.label'),
      defaultMessage: 'Settings.googleAPI.label',
    },
    description: {
      id: getTrad('Settings.googleAPI.description'),
      defaultMessage: "Settings.googleAPI.description",
    },
    name: 'googleAPI',
    type: 'text',
    size: {
      col: 12,
      xs: 12,
    },
  }
];

export default layout;