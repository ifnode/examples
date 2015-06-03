'use strict';

let debug = require('debug')('blog:controllers/~'),
    app = require('ifnode')(),
    _ = require('lodash'),

    m = app.models,
    main_controller = app.Controller({
        name: 'main'
    });

main_controller.get('/login', { access: '?' }, function(request, response) {
    var chance = (new require('chance'))();

    app.models.users.find().lean().exec(function(err, users) {
        response.render('login', {
            user_id: chance.pick(users)._id
        });
    });
});
main_controller.post('/login', { access: '?' },
    app.auth.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

main_controller.get('/logout', { access: '@' }, function(request, response, next) {
    request.logout();
    response.redirect('/');
});

main_controller.get(function(request, response, next) {
    m.pages.find_raw(function(err, pages) {
        if(err) { return next(err); }

        response.render('index', {
            user: request.user,
            pages: pages
        });
    });
});

main_controller.access_denied(function(request, response) {
    response.redirect('/');
});

main_controller.error(function(err, request, response) {
    debug(err);
    response.render('500');
});
