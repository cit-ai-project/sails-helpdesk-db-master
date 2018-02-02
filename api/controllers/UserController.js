/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // URL prefix to proceed
    _config: { prefix: '/api/helpdesk' },
    //Validate Asset
    validateIsAdmin: function (req, res) {
        var queryAllUser = User.find();
        queryAllUser.where({ 'user_name': req.query.userName, 'user_role': 1 });

        queryAllUser.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'Given UserName is not an Admin' });
            }
            res.json({ 'success': true, 'message': 'Given UserName is an Admin', results });
        });
    },

};

