module.exports = {

    overview: function(req, res) {
        Questions.count(function(err, num) {
            if (err) {
                res.send(500, {error: err});
            } else {
                res.send({
                    count: num
                });
            }
        });
    }
};