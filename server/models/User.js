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
    iconUrl: {
      defaultValue: '',
      type: 'string',
    },
    // location should has latitude and longitude properties.
    location: {
      type: 'json',
      validations: [
        function (stringifiedLocations, options, callback) {
          const parsedLocation = JSON.parse(stringifiedLocations);
          if(typeof parsedLocation !== 'object') {
            callback(false);
            return;
          }

          const hasValidProps = parsedLocation.hasOwnProperty('latitude') && parsedLocation.hasOwnProperty('longitude') && Object.keys(parsedLocation).length === 2;
          if(!hasValidProps) {
            callback(false);
            return;
          }

          const hasValidTypes = typeof parsedLocation.latitude === 'number' && typeof parsedLocation.longitude === 'number';
          if(!hasValidTypes) {
            callback(false);
            return;
          }

          callback(true);
        }
      ]
    }
  },
  methods: {
    // If fat arrow is used here,
    // `this` inside this function doesn't refer instance.
    store: function (data) {
      return new Promise((resolve, reject) => {
        this.property(data);
        this.save((errorMessage) => {
          if (errorMessage) {
            /**
             * this.errors:
             * {
             *   id: [ 'notUnique' ],
             *   name: [],
             *   iconUrl: [],
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
    },
    updateLocation: function(location) {
      return this.store({location});
    },
    serialize: function() {
      return {
        id: this.property('id'),
        name: this.property('name'),
        iconUrl: this.property('iconUrl'),
        location: this.property('location'),
      };
    }
  }
});

const classMethodsOfUser = {
  build: async(data) => {
    if(!data) {
      throw new Error('`build` takes an object.');
    }
    if(!data.id) {
      throw new Error('Need `id`.');
    }
    if(!data.location) {
      throw new Error('Need `location`.');
    }

    const user = await Nohm.factory('User');
    user.property(data);

    return user;
  },

  create: async (data) => {
    const user = await Nohm.factory('User');
    user.id = data.id;
    try {
      await user.store(data);
    } catch (err) {
      throw err;
    }

    return user;
  },

  findById: async (id) => {
    let user = await Nohm.factory('User');

    try {
      await user.findById(id);
    } catch (err) {
      // When user is not found, just return null to handle easily.
      // If error is not `not found`, which means unexpected error.
      if(err.message !== 'not found') {
        throw err;
      }
      user = null;
    }

    return user;
  },

  /**
   *
   * @param {*} id
   * @param {string} JSON.stringify({ latitude:..., longitude:...})
   */
  updateLocationById: async (id, location) => {
    const user = await Nohm.factory('User');

    try {
      await user.findById(id);
      await user.updateLocation(location);
    } catch (err) {
      throw err;
    }

    return user;
  }
};

export default Object.assign(User, classMethodsOfUser);