/**
 * Scores model
 * @type {{attributes: {lesson_id: {type: string, required: boolean}, teacher_id: {type: string, required: boolean}, student_id: {type: string, required: boolean}, user_score: {type: string, required: boolean}}}}
 */
module.exports = {

    attributes: {
        lesson_id: {
            type: "STRING",
            required: true
        },
        teacher_id: {
            type: "INT",
            required: true
        },
        student_id: {
            type: "INT",
            required: true
        },
        student_score: {
            type: "INT",
            required: true
        }
    }
};