/**
 * Severity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    severity_id: {
      type: 'integer',
      unique: true,
      primaryKey: true
     },
    severity_name: 'string',
    severity_desc: 'string'
  }
};

