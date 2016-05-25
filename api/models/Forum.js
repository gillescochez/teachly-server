module.exports = {

	attributes: {
		lesson_id: {
			type: "INT",
			required: true
		},
		user_id: {
			type: "INT",
			required: true
		},
		author: {
			type: "STRING",
			required: true
		},
		message: {
			type: "STRING",
			required: true
		},
		reply_id: {
			type: "INT",
			required: true
		}
	}

};