import Nohm from './index';

const User = Nohm.model('User', {
  properties: {
    id: {
      type: 'string',
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
  },
  methods: {
    // If fat arrow is used here,
    // `this` inside this function doesn't refer instance.
    store: function (data) {
      return new Promise((resolve, reject) => {
        this.p(data);
        this.save((err) => {
          if (err) {
            /**
             * this.errors:
             * {
             *   id: [ 'notUnique' ],
             *   name: [],
             *   icon_url: [],
             *   location: []
             * }
             */
            reject(new Error(JSON.stringify(this.errors)));
          } else {
            resolve();
          }
        });
      });

    },
  }
});

User.create = async (data) => {
  const user = await Nohm.factory('User');
  try {
    await user.store(data);
  } catch (err) {
    throw err;
  }

  return user;
};

export default User;