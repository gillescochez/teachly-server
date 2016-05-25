module.exports = {

	send: function(req, res) {
		Room.message(req.param('room'), {room:{id:req.param('room')}, msg: req.param('msg')}, req.socket);
	},

    question: function(req, res) {
        Room.message(req.param('room'), {room:{id:req.param('room')}, q: req.param('question')}, req.socket);
    },

    end_lesson: function(req, res) {
        Room.message(req.param('room'), {room:{id:req.param('room')}, end: true}, req.socket);
        Room.destroy({id: req.param('room')}).populate('participants').exec(function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

};