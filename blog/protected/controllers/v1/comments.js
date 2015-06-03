'use strict';

let app = require('ifnode')(),

    comments = app.Controller({
        name: 'comments'
    });

comments.post({ access: '@' }, function(request, response, next) {
    var data = request.data;

    app.models.comments.add(data, function(err, comment) {
        if(err) { return next(err); }

        response.ok(comment);
    });
});
