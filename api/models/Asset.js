/**
 * Asset.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    asset_id: {
      type: 'string',
      unique: true,
      primaryKey: true
     },
    asset_name: 'string',
    asset_type: 'string',
    assigned_to: {
      model : 'user'
    },
    asset_desc: 'string'
  }
};

