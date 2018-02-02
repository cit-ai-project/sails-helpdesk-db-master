/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // URL prefix to proceed
    _config: { prefix: '/api/helpdesk' },
    //Validate Asset
    validateAsset: function (req, res) {
        var queryAllAsset = Asset.find();
        queryAllAsset.where({ 'asset_id': req.query.assetId, 'assigned_to': req.query.userId });
        queryAllAsset.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Asset fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all User specific tickets Successfully', results });
        });
    },

    //Retrive Asset
     getAssetByUser: function (req, res) {
        var queryAllAsset = Asset.find();
        queryAllAsset.where({'assigned_to': req.query.userId });
        queryAllAsset.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Asset fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all User specific tickets Successfully', results });
        });
    },
};

