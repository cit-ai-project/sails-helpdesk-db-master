/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id: {
      type: 'string',
      unique: true,
      primaryKey: true
     },
    user_name: 'string',
    user_email: 'string',
    user_role : {
      model : 'userRole'
    },
    first_name: 'string',
    last_name: 'string',
    DOB: 'date'

  }
};

