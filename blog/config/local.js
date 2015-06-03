module.exports = {
    site: {
        local: {
            host: 'localhost',
            port: 3000
        },
        global: {
            host: 'examples.blog.ifnode.com'
        }
    },

    application: {
        middleware: {
            'body': {
                'urlencoded': {
                    extended: true
                },
                'json': {}
            },
            'express-session': {
                'name': 'local.blog.sid',
                'secret': 'keyboard cat',
                'resave': false,
                'saveUninitialized': true
            },
            'statics': 'assets/'
        }
    },

    db: {
        blog: {
            schema: 'mongoose',
            config: 'localhost/blog'
        }
    },

    components: {
        auth: {
            local: {
                usernameField: 'id'
            }
        }
    }
};
