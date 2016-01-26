var assert = require('assert');
var env = require('./options.json');
var hk = require("./../index.js");
var api = new hk(env.token);

describe('Apps', function () {

    describe('#createNewApp', function () {
        it('Should create app', function (done) {
            this.timeout(env.timeout);
            api.apps.createNewApp(env.bundleId, env.bundleId, {platform: "Android"}, function (err, data) {
                assert.notEqual(data, null);
                assert.equal(err, null);

                var testVal = {
                    title: env.bundleId,
                    bundle_identifier: env.bundleId,
                    platform: 'Android'
                }
                for (var i in testVal) {
                    assert.equal(testVal[i], data[i]);
                }
                done();
            })
        });
    });

    describe('#uploadApp', function () {
        it('Should upload app', function (done) {
            this.timeout(env.timeout);
            api.apps.uploadApp(env.ipaPath, null, function (err, data) {
                assert.notEqual(data, null);
                var testVal = {
                    "title": env.bundleId,
                    "bundle_identifier": env.bundleId,
                    "platform": "Android",
                    "release_type": 0,
                    "custom_release_type": null,
                    "featured": false,
                    "role": 0,
                    "visibility": "private"
                }
                for (var i in testVal){
                    assert.equal(testVal[i],data[i]);
                }
                assert.equal(err, null);
                done();
            })

        });
    });

    describe('#listApps', function () {
        it('Should list apps', function (done) {
            this.timeout(env.timeout);
            api.apps.listApps(function (err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                var apps = data.apps;
                var appFound = false;

                for (var i in apps) {
                    if (apps[i].bundle_identifier == env.bundleId) {
                        appFound = true;
                        env.appId = apps[i].public_identifier;
                        break;
                    }
                }
                assert.equal(appFound, true);
                done();
            })
        });
    });

    describe('#deletaApp', function () {
        it('Should delete apps', function (done) {
            this.timeout(env.timeout);
            api.apps.deleteApp(env.appId, function (err, data) {
                console.log(data);
                assert.equal(err, null);
                assert.notEqual(data, null);
                done();
            })
        });
    });
})