'use strict';

let app = require('ifnode')(),

    users = app.Model({
        collection: 'users',
        columns: {
            first_name: { type: String },
            last_name: { type: String },
            birth_date: { type: Date },
            gender: { type: String, enum: ['male', 'female'] },
            avatar: { type: String }
        }
    });

users.statics.p = function() {
    var chance = (new require('chance'))();

    this.create({
        first_name: chance.first(),
        last_name: chance.last(),
        birth_date: chance.birthday(),
        gender: chance.gender().toLowerCase(),
        avatar: 'http://placehold.it/128x128'
    })
};
