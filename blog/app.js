'use strict';

let debug = require('debug')('blog:app'),
    ifnode = require('ifnode'),

    app = ifnode({
        env: 'local'
    });

app.register([
    'ifnode-mongoose',
    'ifnode-auth'
]);

app.run(function(config) {
    console.log('Site: ' + config.site.local.origin);
});
