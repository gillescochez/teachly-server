module.exports = {

  teacher: function(req, res) {

    var returns = [];

    Lessons.find({user_id: req.param("user_id")}).exec(function(err, lessons) {

      lessons.forEach(function(lesson) {

        returns.push({
          lesson: processLesson(lesson)
        });

      });

      res.send(returns);

      //Activities.find({}).exec(function(err, activities) {
	  //
      //  if (err) res.send(500, err);
      //  else {
	  //
      //    activities.forEach(function(activity) {
	  //
      //      returns.push({
      //        activity: processLesson(activity)
      //      });
	  //
      //    });
	  //
      //    res.send(returns);
	  //
      //  }
	  //
      //})

    });

  },

  school: function(req, res) {

    var returns = [];

    Lessons.find({}).exec(function(err, lessons) {

      lessons.forEach(function(lesson) {

        returns.push({
          lesson: processLesson(lesson)
        });

      });

      Activities.find({}).exec(function(err, activities) {

        if (err) res.send(500, err);
        else {

          activities.forEach(function(activity) {

            returns.push({
              activity: processLesson(activity)
            });

          });

          res.send(returns);

        }

      })

    });

  },

  student: function(req, res) {

    Registrations.find({student_id: req.param("student_id")}).exec(function(err, items) {

      if (err) res.send(500, err);
      else {

        if (!items.length) {
          res.send(404);
        }

        items.forEach(function(item, index) {

          if (item.activity_id) {

            Activities.findOne({id: item.activity_id}).exec(function(err, activity) {
              if (err) res.send(500, err);
              else {

                item.activity = processActivity(activity);

              }

              if (index + 1 === items.length) {
                res.send(items);
              }
            });
          }

          if (item.lesson_id) {

            Lessons.findOne({id: item.lesson_id}).exec(function(err, lesson) {
              if (err) res.send(500, err);
              else {

                item.lesson = processLesson(lesson);

              }

              if (index + 1 === items.length) {
                res.send(items);
              }
            });
          }

        });

      }

    });

  }

};

function processActivity(activity) {

  activity.title = activity.name;
  activity.allDay = false;
  activity.start = false;
  activity.end = false;

  delete activity.createdAt;
  delete activity.updatedAt;

  return activity;
}

function processLesson(lesson) {

  if (!lesson) {
    return null;
  }

  var start = new Date(lesson.start_date);
  var time = new Date(lesson.start_time);

  start.setHours(time.getHours() + 1);
  start.setMinutes(time.getMinutes());

  var end = new Date(start);
  var duration = lesson.duration || 120;

  end.setHours(time.getHours() + 1 + (duration / 60));

  lesson.allDay = false;
  lesson.start = start;
  lesson.end = end;

  delete lesson.createdAt;
  delete lesson.updatedAt;

  return lesson;
}
