/**
 * UserRole.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    role_id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    role_name: 'string',
    role_short_desc: 'string',
    role_long_desc: 'string'

  }
};

