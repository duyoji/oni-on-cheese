import Nohm from './index';

const User = Nohm.model('User', {
  idGenerator: function(cb) {
    if(!this.id) {
      throw new Error('Need tot set `id` as a prop.');
    }
    cb(this.id);
  },
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
        this.save((errorMessage) => {
          if (errorMessage) {
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
    findById: function(id) {
      return new Promise((resolve, reject) => {
        this.load(id, function (errorMessage, properties) {
          if (errorMessage) {
            reject(new Error(errorMessage));
          } else {
            resolve(properties);
          }
        });
      });
    }
  }
});

User.create = async (data) => {
  const user = await Nohm.factory('User');
  user.id = data.id;
  try {
    await user.store(data);
  } catch (err) {
    throw err;
  }

  return user;
};

User.findById = async (id) => {
  const user = await Nohm.factory('User');

  try {
    await user.findById(id);
  } catch (err) {
    throw err;
  }

  return user;
};

export default User;