'use strict';

let app = require('ifnode')(),

    mongoose = app.ext('ifnode-mongoose').mongoose,

    SchemaTypes = mongoose.Schema.Types,
    comments = app.Model({
        collection: 'comments',
        columns: {
            author_id: { type: SchemaTypes.ObjectId },
            created_date: { type: Date, default: function() { return new Date; } },
            content: { type: String }
        }
    });

comments.statics.add = function(data, callback) {
    this.create({
        author_id: data.author_id,
        content: data
    }, callback);
};
