'use strict';

var debug = require('debug')('blog:webuser'),
    app = require('ifnode')(),

    webuser = app.Model({
        name: 'webuser'
    }, {
        db: 'virtual'
    });

webuser.serialize = function(user, callback) {
    callback(null, user._id);
};
webuser.deserialize = function(_id, callback) {
    app.models.users.findOne({ _id: _id }, callback);
};

webuser.get_role = function(user, callback) {
    callback(null, user.role);
};

webuser.strategy = {
    local: function(_id, password, callback) {
        app.models.users.findOne({ _id: _id }, callback);
    }
};
