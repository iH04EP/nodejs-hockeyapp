(function () {
    var Versions;

    Versions = (function () {
        var ApiConstants = require('./../ApiConstants.js');

        function Versions(parent) {
            this.executeRequest = parent.executeRequest;
        }

        Versions.prototype.listVersions = function (id, cb) {
            return this.executeRequest(ApiConstants.Sections.apps + "/" + id + ApiConstants.Sections.versions, ApiConstants.Methods.get, null, function (err, data) {
                return cb(err, data);
            });
        };

        Versions.prototype.statistics = function (id, cb) {
            return this.executeRequest(ApiConstants.Sections.apps + "/" + id + ApiConstants.Sections.statistics, ApiConstants.Methods.get, null, function (err, data) {
                return cb(err, data);
            });
        };

        Versions.prototype.uploadVersion = function (id, ipa, opts, cb) {
            if (ipa == null && (opts == null || opts.dsym == null))
                return cb("Ipa param missed. Ipa param is required if \"dsym\" is not specified.");
            if (opts == null) opts = {};
            opts.ipa = ipa;

            this.executeRequest(ApiConstants.Sections.apps + "/" + id + ApiConstants.Sections.versions + "/upload", ApiConstants.Methods.post, opts, function (err, data) {
                return cb(err, data);
            });
        };

        Versions.prototype.createVersion = function (id, bundleVersion, opts, cb) {
            if (bundleVersion == null)
                return cb("bundle_version param missed.");
            if (opts == null) opts = {};
            opts.bundle_version = bundleVersion;
            return this.executeRequest(ApiConstants.Sections.apps + "/" + id + ApiConstants.Sections.versions + "/new", ApiConstants.Methods.post, opts, function (err, data) {
                return cb(err, data);
            });
        };

        Versions.prototype.updateVersion = function (id, versionId, ipa, opts, cb) {
            if (opts == null) opts = {};
            if (ipa != null)
                opts.ipa = ipa;
            return this.executeRequest(ApiConstants.Sections.apps + "/" + id + ApiConstants.Sections.versions + "/" + versionId, ApiConstants.Methods.put, opts, function (err, data) {
                return cb(err, data);
            });
        };

        Versions.prototype.deleteSingleVersion = function (id, version, opts, cb) {
            return this.executeRequest(ApiConstants.Sections.apps + "/" + id + ApiConstants.Sections.versions + "/" + version, ApiConstants.Methods.delete, opts, function (err, data) {
                return cb(err, data);
            });
        };

        return Versions;

    })();

    module.exports = Versions;

}).call(this);
