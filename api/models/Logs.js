module.exports = {

    attributes: {
        user_id: {
            type: "INT",
            required: true
        },
        user_type: {
            type: "INT",
            required: true
        },
        lesson_id: {
            type: "INT"
        },
        question_id: {
            type: "INT"
        },
        answer_id: {
            type: "INT"
        },
        event: {
            type: "STRING",
            required: true
        }
    }

};