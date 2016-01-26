var assert = require('assert');
var env = require('./options.json');
var hk = require("./../index.js");
var api = new hk(env.token);


describe('Versions', function () {
    before(function(done){
        api.apps.createNewApp(env.bundleId, env.bundleId, {platform: "Android"}, function (err, data) {
            env.appId = data.public_identifier;
            done();
        });
    });

    after(function(done){
        api.apps.deleteApp(env.appId, function (err, data) {
            env.appId = data.public_identifier;
            done();
        });
    });

    describe('#createVersion', function () {
        it('Should create version', function (done) {
            this.timeout(env.timeout);
            api.versions.createVersion(env.appId, 1.15, null, function (err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                var trueData = {
                    version: '1.15',
                    title: 'com.app.test',
                    mandatory: false,
                    external: false,
                    status: 1
                }
                for (var i in trueData)
                {
                    assert.equal(trueData[i], data[i]);
                }
                done();
            })
        });
    });

    describe('#listVersions', function () {
        it('Should list versions', function (done) {
            this.timeout(env.timeout);
            api.versions.listVersions(env.appId, function (err, data) {
                assert.notEqual(data, null);
                assert.notEqual(data.app_versions, null);
                assert.equal(data.status, "success");
                assert.equal(err, null);
                done();
            })
        });
    });

    describe('#statistics', function () {
        it('Should return statistics', function (done) {
            this.timeout(env.timeout);
            api.versions.statistics(env.appId, function (err, data) {
                assert.notEqual(data, null);
                assert.notEqual(data.app_versions, null);
                assert.equal(data.status, "success");
                assert.equal(err, null);
                done();
            })
        });
    });

    describe('#uploadVersion', function () {
        it('Should upload version', function (done) {
            this.timeout(env.timeout);
            api.versions.uploadVersion(env.appId, env.ipaPath, null, function (err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                var trueData ={
                    version: '1',
                    shortversion: '1.0',
                    title: 'com.app.test',
                    appsize: 37468,
                    notes: '',
                    mandatory: false,
                    external: false,
                    device_family: null,
                    restricted_to_tags: false,
                    status: 1,
                    expired_at: null
                }
                for (var i in trueData)
                {
                    assert.equal(trueData[i], data[i]);
                }
                done();
            })
        });
    });

    describe('#updateVersion', function () {
        var versionId;
        before(function(done){
            this.timeout(env.timeout);
            api.versions.listVersions(env.appId, function (err, data) {
                versionId = data.app_versions[0].id;
                done();
            })
        })
        it('Should upload version', function (done) {
            this.timeout(env.timeout);
            var rnd = Math.random();
            opts = {
                notes : rnd,
                notes_type :0,
            }
            api.versions.updateVersion(env.appId, versionId, env.ipaPath, opts, function (err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                assert.equal(data.notes, "<p>"+rnd+"</p>");
                done();
            })
        });
    });

    describe('#deleteSingleVersion', function () {
        var versionId;
        before(function(done){
            this.timeout(env.timeout);
            api.versions.listVersions(env.appId, function (err, data) {
                versionId = data.app_versions[0].id;
                done();
            })
        })
        it('Should delete version', function (done) {
            this.timeout(env.timeout);
            var opts = {
                strategy : "purge"
            }
            api.versions.deleteSingleVersion(env.appId, versionId, opts, function (err, data) {
                assert.equal(err, null);
                assert.notEqual(data, null);
                done();
            })
        });
    });
})