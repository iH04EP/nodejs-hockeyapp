var assert = require('assert');
var env = require('./options.json');
var hk = require("./../index.js");
var api = new hk();

describe('Authinication', function () {
    describe('#login', function () {
        it('Should login', function (done) {
            this.timeout(env.timeout);
            api.login(env.login, env.pass, 0, 0, function (err, data) {
                assert.notEqual(data, null);
                assert.equal(data, env.token);
                assert.equal(err, null);
                done();
            })
        });
    });
})