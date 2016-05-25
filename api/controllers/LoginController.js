module.exports = {

    /**
     * Login method
     * @param req {Object} Request object
     * @param res {Object} Response object
     */
    login: function(req, res) {

        var hash = require("password-hash");
        var username = req.param("username");
        var password = req.param("password");

        Users.findByUsername(username).then(function(user, err) {

            user = user[0];

            if (err) {
                res.send(500, {error: err});
            } else {

                if (user) {

                    if (hash.verify(password, user.password)) {

                        req.session.username = user.username;
                        req.session.user_type = user.user_type;
                        req.session.user_id = user.id;

						res.send({
                            username: user.username,
                            user_type: user.user_type,
                            id: user.id
                        });

                    } else {
                        res.send(400, { error: "PASSWORD" });
                    }

                } else {
                    res.send(404, { error: "NOT_FOUND" });
                }
            }

        });
    },

	logout: function(req, res) {

		req.session.username = null;
		req.session.user_type = null;
		req.session.id = null;

		res.send("Successfully logged out");
	}
};