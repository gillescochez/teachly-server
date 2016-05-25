module.exports = {

    single: function(req, res) {

	    var id = req.param("id");
	    var user_id = req.param("user_id");
	    var user_type = req.param("user_type");

	    Lessons.findOne({id: id}).exec(function(err, item) {
			if (err) res.send(500, err);
		    else {

				Users.findOne({id: item.user_id}).exec(function(err, teacher) {
					if (err) res.send(500, err);
					else {
						item.teacher = teacher;
					}
				});


				if (user_type == 3) {

					Scores.where({lesson_id: item.id, student_id: user_id}, function(err, scores) {
						if (err) {
							res.send(500, {error: err});
						} else {
							item.taken = !!scores.length;
						}
					});

					Registrations.where({lesson_id: item.id, student_id: user_id}, function(err, registrations) {

						if (err) {
							res.send(500, {error: err});
						} else {

							if (registrations.length) {
								item.signed = true;
							}
						}

						res.send(item);

					});

				} else if (user_type == 2) {

					Registrations.where({lesson_id: item.id}, function(err, registrations) {

						if (err) {
							res.send(500, {error: err});
						} else {
							item.registrations = registrations.length;
						}

						res.send(item);

					});

				} else {
					res.send(item);
				}
			}
	    });

    },

	list: function(req, res) {

        // TODO when session is done right those should not be passed in the query URL
        var id = req.param("user_id");
        var user_type = req.param("user_type");

        var config = {};
        var socketId = sails.sockets.id(req.socket);

        if (user_type == 3) {
            config.published = true;
        }

        if (user_type == 2) {
            config.user_id = id;
        }

        Lessons.where(config, function(err, lessons) {

            if (err) {
                res.send(500, {error: err});
            } else {

                if (socketId) {
                    Lessons.subscribe(req.socket, lessons);
                }

                if (user_type == 3) {

                    lessons.forEach(function(lesson, index) {

                        Scores.where({lesson_id: lesson.id, student_id: id}, function(err, scores) {
                            if (err) {
                                res.send(500, {error: err});
                            } else {
                                lesson.taken = !!scores.length;
                            }
                        });

                        Registrations.where({lesson_id: lesson.id, student_id: id}, function(err, registrations) {

                            if (err) {
                                res.send(500, {error: err});
                            } else {

                                if (registrations.length) {
                                    lesson.signed = true;
                                }
                            }

                            if (index === lessons.length - 1) {
                                res.send(lessons);
                            }

                        });

                    });

                } else if (user_type == 2) {

                    lessons.forEach(function(lesson, index) {

                        Registrations.where({lesson_id: lesson.id}, function(err, registrations) {

                            if (err) {
                                res.send(500, {error: err});
                            } else {
                                lesson.registrations = registrations.length;
                            }

                            if (index === lessons.length - 1) {
                                res.send(lessons);
                            }

                        });

                    });

                } else {
                    res.send(lessons);
                }

            }
        });

    },

    student: function(req, res) {

        // TODO when session is done right those should not be passed in the query URL
        var id = req.param("student_id");

        var lesson_ids = [];
        var response = {};
        var scoresMap = {};

        Scores.where({student_id: id}, function(err, scores) {

            if (err) {
                res.send(500, {error: err});
            } else {

                scores.forEach(function(score) {
                    lesson_ids.push(score.lesson_id);
                    scoresMap[score.lesson_id] = score;
                });

                Lessons.where({id: lesson_ids}, function(err, lessons) {

                    if (err) {
                        res.send(500, {error: err});
                    } else {

                        lessons.forEach(function(lesson, index) {

                            lesson.score = scoresMap[lesson.id].student_score;

                            Users.findOne({id: scoresMap[lesson.id].teacher_id}).exec(function(err, user) {

                                if (err) {
                                    res.send(500, {error: err});
                                } else {
                                    lesson.teacher = user;
                                }

                                if (index === lessons.length - 1) {
                                    res.send(lessons);
                                }
                            });
                        });
                    }
                });
            }
        });
    },

    overview: function(req, res) {

        var response = {};

        // TODO when session is done right those should not be passed in the query URL
        var id = req.param("id");

        var config = {
            given: true
        };
        var upcoming = 0;
        var delivered = 0;

        if (id) {

            config.user_id = id;

            Lessons.where({user_id: id}, function(err, lessons) {

                var delivered = 0;
                var upcoming = 0;

                if (err) {
                    res.send(500, {error: err});
                } else {

                    lessons.forEach(function(lesson, index) {

                        if (lesson.given == true) {
                            delivered++;
                        } else {
                            upcoming++;
                        }

                        Questions.count({lesson_id: lesson.id}, function(err, num) {
                            lesson.questions_count = num;
                        });

                        Scores.where({lesson_id: lesson.id}, function(err, scores) {

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

                                    lesson.score_sum = sum;
                                    lesson.score_average = average;
                                    lesson.students_count = length;
                                }

                                if (index === lessons.length - 1) {
                                    res.send({
                                        lessons: lessons,
                                        delivered: delivered,
                                        upcoming: upcoming,
                                        count: lessons.length
                                    });
                                }
                            }
                        });
                    });

                }
            });

        } else {

            Lessons.count(config, function(err, num) {
                if (err) {
                    res.send(500, {error: err});
                } else {
                    delivered = num;
                }
            });

            config.given = false;
            Lessons.count(config, function(err, num) {
                if (err) {
                    res.send(500, {error: err});
                } else {
                    upcoming = num;
                }
            });

            delete config.given;
            Lessons.count(config, function(err, num) {
                if (err) {
                    res.send(500, {error: err});
                } else {
                    response = {
                        upcoming: upcoming,
                        delivered: delivered,
                        count: num
                    };
                    if (!id) {
                        res.send(response);
                    }
                }
            });
        }
    }
};