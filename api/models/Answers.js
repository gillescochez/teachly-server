/**
 * Answers model
 * @type {{attributes: {username: string, password: string, user_type: string, user_id: string}}}
 */
module.exports = {

	attributes: {
		answer: {
			type: "STRING",
			required: true
		},
		question_id: {
			type: "INT",
			required: true
		},
        is_valid: {
            type: "STRING"
        }
	}
};