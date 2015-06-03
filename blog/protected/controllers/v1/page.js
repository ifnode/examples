var app = require('ifnode')(),

    pages_model = app.models.pages,
    page_controller = app.Controller({
        name: 'api_page'
    });

page_controller.get(function(request, response, next) {
    response.ok(pages_model.get());
});
page_controller.get('/:id', function(request, response) {
    response.ok(pages_model.get(request.params.id) || {});
});

page_controller.post(function(request, response, next) {
    var data = request.data;

    if(!data) {
        data = {
            title: Math.random(),
            content: Math.random()
        };
    }

    data.id = Math.random();

    pages_model.set(data.id, data);

    response.redirect('/');
});

page_controller.error(function(err, request, response) {
    response.ok({ message: err.message, stack: err.stack });
});
