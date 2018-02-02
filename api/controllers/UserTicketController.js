/**
 * UserTicketController
 *
 * @description :: Server-side logic for managing usertickets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // URL prefix to proceed
    _config: { prefix: '/api/helpdesk' },
    //Create new Ticket
    create: function (req, res) {

        UserTicket.create(req.params.all(), function userTicketCreated(err, userTicket) {
            if (err)
                return res.json({ 'success': false, 'message': err });
            res.json({ 'success': true, 'TicketNo': userTicket.id });

        });
    },

    //update ticket status
    modifyStatus: function (req, res) {
        var result = [];
        var tmpObj = {};
        //Split the string and keep in array
        var ticketsArray = req.query.ticketId.split(',');
        console.log("ticketsArrayLength ==" + ticketsArray.length);
        for (var i = 0; i < ticketsArray.length; i++) {
            console.log("ticketsArray[" + i + "] ==" + ticketsArray[i]);
            // Trim the excess whitespace.
            ticketsArray[i] = ticketsArray[i].replace(/^\s*/, "").replace(/\s*$/, "");
        }

        console.log("Ticket executed" + ticketsArray[i]);
        UserTicket.update(ticketsArray, { status: req.query.statusId }).exec(function updateTicketStatus(err, updated) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            else {
                for (const key of Object.keys(updated)) {
                    tmpObj = new Object({ 'id': updated[key].id });
                    result.push(tmpObj);
                }
            }
           return res.json({ 'success': true, 'message': 'Status Updated Successfully', result });
        });
    },


    //update ModifiedBy User
    modifyModifiedBy: function (req, res) {

        UserTicket.update({ id: req.query.ticketId }, { modified_by: req.query.userId }).exec(function updateModifiedBy(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //update AssignedTo User
    modifyAssignedTo: function (req, res) {

        UserTicket.update({ id: req.query.ticketId }, { assigned_to: req.query.userId }).exec(function updateAssignedTo(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //update AssignedBy User
    modifyAssignedBy: function (req, res) {

        UserTicket.update({ id: req.query.ticketId }, { assigned_by: req.query.userId }).exec(function updateAssignedBy(err, updated) {

            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            res.json({ 'success': true, 'message': 'User Updated Successfully' });
        });
    },

    //getAll UserTickets created by a User
    getAllUserTickets: function (req, res) {

        var queryAllUserTicket = UserTicket.find();
        queryAllUserTicket.where({ 'created_by': req.query.userId });
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            // console.log("Results == >"+results);
            res.json({ 'success': true, 'message': 'Retrived all User specific tickets Successfully', results });


        });
    },


    //getAllTicketsByStatus  'new' status UserTickets  order by priority severity
    getAllTicketsByStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();
        if (req.query.ticketStatus != undefined) {
            queryAllUserTicket.where({ 'status': req.query.ticketStatus });
        }
        queryAllUserTicket.sort('priority ASC');
        queryAllUserTicket.sort('severity ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all new tickets Successfully', results });
        });
    },

    //getAllTicketsByPriority  get all tickets by priority
    getAllTicketsByPriorityStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();

        if (req.query.ticketStatus != undefined)
            queryAllUserTicket.where({ 'priority': req.query.ticketPriority, 'status': req.query.ticketStatus });
        else
            queryAllUserTicket.where({ 'priority': req.query.ticketPriority });

        queryAllUserTicket.sort('status ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Priority Successfully', results });
        });
    },

    //getAllTicketsByPriority  get all tickets by priority
    getAllTicketsBySeverityStatus: function (req, res) {

        var queryAllUserTicket = UserTicket.find();

        if (req.query.ticketStatus != undefined)
            queryAllUserTicket.where({ 'severity': req.query.ticketSeverity, 'status': req.query.ticketStatus });
        else
            queryAllUserTicket.where({ 'severity': req.query.ticketSeverity });

        queryAllUserTicket.sort('status ASC');
        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Severity Successfully', results });
        });
    },

    /**  Method Name    :   getTickets
     *   Purpose        :   get all user(s) tickets based on userid or all, priority, severity, status
     *   @return        :   Return found tickets in json format
     *   @error         :   Return error message
     **/
    getTickets: function (req, res) {
        var queryAllUserTicket = UserTicket.find();

        if ((req.query.ticketId != undefined || req.query.ticketId != null) && (req.query.ticketId.length > 0)) {
            queryAllUserTicket.where({ 'id': req.query.ticketId });
        }

        if ((req.query.userId != undefined || req.query.userId != null) && (req.query.userId.length > 0)) {
            queryAllUserTicket.where({ 'created_by': req.query.userId });
        }

        if ((req.query.ticketStatus != undefined || req.query.ticketStatus != null) && (req.query.ticketStatus.length > 0)) {
            queryAllUserTicket.where({ 'status': req.query.ticketStatus });
        }

        if ((req.query.ticketSeverity != undefined || req.query.ticketSeverity != null) && (req.query.ticketSeverity.length > 0)) {
            queryAllUserTicket.where({ 'severity': req.query.ticketSeverity });
        }

        if ((req.query.ticketPriority != undefined || req.query.ticketPriority != null) && (req.query.ticketPriority.length > 0)) {
            queryAllUserTicket.where({ 'priority': req.query.ticketPriority });
        }

        /**    queryConditions = '';
     
            if ((req.query.userId.value) && (req.query.userId != undefined || req.query.userId != null)) {
                console.log("Inside all condition");
     
                queryConditions = queryConditions + "{'created_by' :" + req.query.userId;
            }
     
            if ((req.query.ticketStatus.value) && (req.query.ticketStatus != undefined || req.query.ticketStatus != null)) {
                queryConditions = queryConditions + "},'status' :" + req.query.ticketStatus + "}";
            }
            console.log("queryConditions--==>" + queryConditions);
            queryAllUserTicket.where(queryConditions); **/

        queryAllUserTicket.sort('priority ASC');
        queryAllUserTicket.sort('severity ASC');
        queryAllUserTicket.sort('status ASC');

        queryAllUserTicket.exec(function callBack(err, results) {
            if (err) {
                return res.json({ 'success': false, 'message': err });
            }
            if (Object.keys(results).length == 0) {
                return res.json({ 'success': false, 'message': 'No Data fetched from DB' });
            }
            res.json({ 'success': true, 'message': 'Retrived all tickets by Severity Successfully', results });
        });
    },
}



