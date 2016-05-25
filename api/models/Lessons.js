/**
 * Lessons model
 * @type {{attributes: {username: string, password: string, user_type: string, user_id: string}}}
 */
module.exports = {

	attributes: {
		title: {
			type: "STRING",
			required: true
		},
		start_date: {
			type: "STRING",
			required: true
		},
		start_time: {
			type: "STRING",
			required: true
		},
    user_id: {
      type: "INT",
      required: true
    },
    subject_id: {
      type: "INT",
      required: true
    },
    given: {
        type: "BOOLEAN"
    },
    started: {
        type: "BOOLEAN"
    },
    initialized: {
        type: "BOOLEAN"
    },
    published: {
        type: "BOOLEAN"
    },
    duration: {
      type: "INT"
    }
	}
};
