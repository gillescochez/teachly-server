/**
 * Answers model
 * @type {{attributes: {username: string, password: string, user_type: string, user_id: string}}}
 */
module.exports = {

  attributes: {
    title: {
      type: "STRING",
      required: true
    },
    description: {
      type: "STRING"
    },
    user_id: {
      type: "INT",
      required: true
    },
    allDay: {
      type: "STRING"
    },
    recurring: {
      type: "STRING"
    },
    start: {
      type: "datetime",
      required: true
    },
    end: {
      type: "datetime"
    }
  }
};
