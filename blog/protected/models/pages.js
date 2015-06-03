'use strict';

let app = require('ifnode')(),
    _ = require('lodash'),
    mongoose = app.ext('ifnode-mongoose').mongoose,

    Types = mongoose.Types,
    SchemaTypes = mongoose.Schema.Types,
    pages = app.Model({
        collection: 'pages',
        columns: {
            title: { type: String },
            content: { type: String },
            creator_id: { type: SchemaTypes.ObjectId },
            created_date: { type: Date },
            posted_date: { type: Date},
            logo: { type: String }
        }
    });

pages.statics.p = function() {
    let chance = (new require('chance'))(),
        self = this;

    app.models.users.find().lean().exec(function(err, users) {
        self.create({
            title: chance.sentence({ words: 7 }),
            content: chance.paragraph(),
            creator_id: chance.pick(users)._id,
            created_date: chance.date({ year: 2015, month: 2 }),
            posted_date: chance.date({ year: 2015, month: 3 }),
            logo: 'http://placehold.it/900x300'
        })
    });
};

pages.statics.find_by_id = function(_id, callback) {
    this.findOne({ _id: _id }).lean().exec(function(err, page) {
        if(err) { return callback(err); }

        app.models.users.findOne({ _id: page.creator_id }).lean().exec(function(err, creator) {
            if(err) { return callback(err); }

            delete page.creator_id;
            page.creator = creator;

            callback(null, page);
        });
    });
};

pages.statics.find_raw = function() {
    var args = [].slice.call(arguments),
        callback = args.pop();

    this.find.apply(this, args).lean().exec(function(err, pages) {
        if(err) { return callback(err); }

        app.models.users.find().lean().exec(function(err, users) {
            if(err) { return callback(err); }

            pages = pages.map(function(page) {
                var creator = _.findWhere(users, { _id: page.creator_id });

                delete page.creator_id;
                page.creator = creator;

                return page;
            });

            callback(null, pages);
        });
    });
};
