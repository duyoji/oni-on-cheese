import Nohm from './index';

const User = Nohm.model('User', {
  properties: {
    id: {
      type: 'integer',
      unique: true,
      validations: [
        ['notEmpty'],
      ]
    },
    name: {
      type: 'string',
      validations: [
        ['notEmpty']
      ]
    },
    icon_url: {
      defaultValue: '',
      type: 'string',
    },
    // location should has latitude and longitude properties.
    location: {
      type: 'json',
      validations: [
        ['notEmpty']
      ]
    }
  }
});

export default User;