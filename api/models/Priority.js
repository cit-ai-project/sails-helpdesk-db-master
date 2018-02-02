/**
 * Priority.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    priority_id: {
      type: 'integer',
      unique: true,
      primaryKey: true
     },
    priority_name: 'string',
    priority_desc: 'string'
  }
};

