/**
 * Questions model
 * @type {{attributes: {username: string, password: string, user_type: string, user_id: string}}}
 */
module.exports = {

	attributes: {
		question: {
			type: "STRING",
			required: true
		},
		lesson_id: {
			type: "INT",
			required: true
		}
	}
};