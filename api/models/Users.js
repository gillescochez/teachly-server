/**
 * Users model
 * @type {{attributes: {username: string, password: string, user_type: string, user_id: string}}}
 */
module.exports = {

    attributes: {
        username: {
            type: "STRING",
            unique: true,
            required: true
        },
        password: {
            type: "STRING",
            required: true
        },
        first_name: {
            type: "STRING"
        },
        last_name: {
            type: "STRING"
        },
        user_type: "INT"
    },

    /**
     * Executed on create to hash the password before storing it
     * @param attrs {Object} Attributes to use for creation
     * @param next {Function} Make sure the process continue
     */
    beforeCreate: function(attrs, next) {
        var hash = require("password-hash");
        attrs.password = hash.generate(attrs.password);
        next();
    }
};