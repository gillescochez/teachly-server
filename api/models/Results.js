/**
 * Results table used to store given answer to lessons
 * @type {{attributes: {question_id: {type: string, required: boolean}, user__id: {type: string, required: boolean}, user_answer_id: {type: string, required: boolean}}}}
 */
module.exports = {

	attributes: {
        lesson_id: {
            type: "STRING",
            required: true
        },
        question_id: {
            type: "STRING",
            required: true
        },
		user_id: {
			type: "INT",
			required: true
		},
		user_answer_id: {
			type: "INT",
			required: true
		}
	},

    beforeCreate: function(data, next) {

        Answers.where({id: data.user_answer_id}, function(err, answer) {

            answer = answer[0] || {};

            Scores.where({lesson_id: data.lesson_id, student_id: data.user_id}, function(err, score) {

                if (err) {

                    res.send(500, {err: err});

                } else {

                    score = score[0] || {};

                    if (score.id) {

                        Scores.update({id: score.id}, {
                            lesson_id: data.lesson_id,
                            teacher_id: data.teacher_id,
                            student_id: data.user_id,
                            student_score: answer.is_valid ? parseInt(score.student_score) + 10 : parseInt(score.student_score),
                            id: score.id
                        }).exec(function(err) {
                            !err && next();
                        });

                    } else {

                        Scores.create({
                            lesson_id: data.lesson_id,
                            teacher_id: data.teacher_id,
                            student_id: data.user_id,
                            student_score: answer.is_valid ? 10 : 0
                        }, function(err) {
                            !err && next();
                        });
                    }

                }
            });
        });
    }
};