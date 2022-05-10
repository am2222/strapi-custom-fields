module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'custom-fields.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'custom-fields.getSettings',
    config: {
      policies: [],
    }
  },
  {
    method: 'PUT',
    path: '/settings',
    handler: 'custom-fields.updateSettings',
    config: {
      policies: [ ],
    }
  },
];
