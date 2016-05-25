module.exports = {

    list: function(req, res) {

        Logs.find({}).sort("created ASC").exec(function(err, logs) {
            if (err) {
                res.send(500, {error: err});
            } else {

                logs.forEach(function(log, index) {

                    if (log.user_type == 1) {
                        log.user_type = "Administrator";
                    }

                    if (log.user_type == 2) {
                        log.user_type = "Teacher";
                    }

                    if (log.user_type == 3) {
                        log.user_type = "Student";
                    }

                    Users.findOne({id: log.user_id}).exec(function(err, user) {
                        log.name = user.first_name + " " + user.last_name;
                    });

                    Lessons.findOne({id: log.lesson_id}).exec(function(err, lesson) {

                        if (!err) {
                            log.lesson = lesson.title;
                        }

                            Questions.findOne({id: log.question_id}).exec(function(err, question) {
                                if (!err && question) {
                                    log.question = question.title;
                                }
                            });

                            Answers.findOne({id: log.answer_id}).exec(function(err, answer) {
                                if (!err && answer) {
                                    log.answer = answer.title;
                                }

                                if (index == logs.length - 1) {
                                    res.send(logs);
                                }
                            });

                    });
                });

            }
        });

    }

};