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
            console.error(this.errors); // the errors in validation
            reject(err);
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
    console.error(err);
  }

  return user;
};

export default User;