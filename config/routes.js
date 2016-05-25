/**
 * Application routing
 * @type {Object}
 */
module.exports.routes = {

    "/login": {
        controller: "login",
        action: "login"
    },

    "/logout": {
        controller: "login",
        action: "logout"
    },

	"post /room/:roomId/participants": "RoomController.join",
	"delete /room/:roomId/participants": "RoomController.leave",
  "get /calendar/student": "CalendarController.student",

    "get /lessons": "LessonsController.list",

    "get /lesson/:id": "LessonsController.single",

    "get /logs": "LogsController.list"

};
