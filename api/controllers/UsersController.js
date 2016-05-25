/**
 * User controller
 * @type {{}}
 */
module.exports = {

    students: function(req, res) {

        Users.where({user_type: 3}, function(err, students) {

                if (err) {
                    res.send(500, {error: err});
                } else {

                    students.forEach(function(student, index) {

                        student.full_name = (student.first_name ? (student.last_name ? student.first_name + " " + student.last_name : student.first_name) : "");

                        Scores.where({student_id: student.id}, function(err, scores) {
                            if (err) {
                                res.send(500, {error: err});
                            } else {

                                if (scores) {

                                    var sum = 0;
                                    var average;

                                    var length = scores.length;
                                    var i = 0;

                                    for (; i < length; i++) {
                                        sum += parseInt(scores[i].student_score, 10); //don't forget to add the base
                                    }

                                    average = Math.round((sum / length) * 100) / 100;

                                    student.score_sum = sum;
                                    student.score_average = average;
                                    student.lessons_taken = length;
                                }

                                if (index === students.length - 1) {
                                    res.send(students);
                                }
                            }
                        });
                    });
                }
        });

    },

    teachers: function(req, res) {

        Users.where({user_type:2}, function(err, teachers) {

            if (err) {
                res.send(500, {error: err});
            } else {

                teachers.forEach(function(teacher, index) {

                    teacher.full_name = (teacher.first_name ? (teacher.last_name ? teacher.first_name + " " + teacher.last_name : teacher.first_name) : "");

                    Lessons.where({user_id: teacher.id, given: true}, function(err, lessons) {
                        teacher.last_lesson_given = lessons[lessons.length - 1];
                        teacher.lessons_count = lessons.length;
                    });

                    Scores.where({teacher_id: teacher.id}, function(err, scores) {

                        if (err) {
                            res.send(500, {error: err});
                        } else {

                            if (scores) {

                                var sum = 0;
                                var average;

                                var length = scores.length;
                                var i = 0;

                                for (; i < length; i++) {
                                    sum += parseInt(scores[i].student_score, 10); //don't forget to add the base
                                }

                                average = Math.round((sum / length) * 100) / 100;

                                teacher.score_sum = sum;
                                teacher.score_average = average;
                                teacher.lessons_delivered = length;
                            }

                            if (index === teachers.length - 1) {
                                res.send(teachers);
                            }
                        }

                    });

                });
            }

        });

    },

    overview: function(req, res) {

        var overview = {
            schools: {},
            teachers: {},
            students: {}
        };

        Users.count(function(err, num) {
            if (err) {
                res.send(500, {error: err});
            } else {
                overview.count = num;
            }
        });

        Users.count({user_type:1}, function(err, num) {
            if (err) {
                res.send(500, {error: err});
            } else {
                overview.schools.count = num;
            }
        });

        Users.count({user_type:2}, function(err, num) {
            if (err) {
                res.send(500, {error: err});
            } else {
                overview.teachers.count = num;
            }
        });

        Users.count({user_type:3}, function(err, num) {
            if (err) {
                res.send(500, {error: err});
            } else {
                overview.students.count = num;
                res.send(overview);
            }
        });

    }

};