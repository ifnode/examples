'use strict';

let debug = require('debug')('blog:controllers/page'),
    app = require('ifnode')(),

    pages = app.models.pages,
    page = app.Controller({
        name: 'page'
    });

page.param('page', function(request, response, next, page_id) {
    pages.find_by_id(page_id, function(err, page) {
        if(err) { return next(err); }

        if(!page) {
            return response.redirect('/');
        }

        request.params.page = page;
        next();
    });
});

page.get('/:page', function(request, response, next) {
    response.render('page/index', {
        user: request.user,
        page: request.params.page
    });
});

page.end();
