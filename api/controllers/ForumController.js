module.exports = {

	index: function(req, res) {

		Forum.find({
			lesson_id: req.param("lesson_id"),
			reply_id: req.param("reply_id") || 0
		}).where().exec(function(err, items) {
			if (err) res.send(500, err);
			else {

				items.forEach(function(item, index) {

					item.replies = [];

					Forum.find({reply_id: item.id}).exec(function(err, replies) {

						if (err) res.send(500, err);
						else {
							item.replies = replies;
						}

						if ((index + 1) === items.length) {
							res.send(items);
						}
					});

				});

			}
		});

	}

};