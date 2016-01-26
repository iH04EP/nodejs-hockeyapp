(function () {
    var Apps;

    Apps = (function () {

        var ApiConstants = require('./../ApiConstants.js');
        var executeRequest;

        function Apps(parent) {
            executeRequest = parent.executeRequest;
        }

        Apps.prototype.listApps = function (cb) {
            return executeRequest(ApiConstants.Sections.apps, ApiConstants.Methods.get, null, cb);
        };

        Apps.prototype.createNewApp = function (title, bundleId, opts, cb) {
            if (bundleId == null || bundleId == "")
                return cb("bundleId param missed");
            if (title == null || title == "")
                return cb("title param missed");
            if (opts == null) opts = {};

            opts.title = title;
            opts.bundle_identifier = bundleId;
            executeRequest(ApiConstants.Sections.apps+"/new", ApiConstants.Methods.post, opts, function (err, data) {
                return cb(err, data);
            });
        };

        Apps.prototype.deleteApp = function (appId, cb) {
            return executeRequest(ApiConstants.Sections.apps+"/"+ appId, ApiConstants.Methods.delete, null, function (err, data) {
                return cb(err, data);
            });
        };

        Apps.prototype.uploadApp = function (ipa, opts, cb) {
            if (ipa == null)
                return cb("Ipa param missed");
            if (opts == null) opts = {};
            opts.ipa = ipa;
            executeRequest(ApiConstants.Sections.apps +"/upload", ApiConstants.Methods.post, opts, function (err, data) {
                return cb(err, data);
            });
        };

        return Apps;
    })()

    module.exports = Apps;

}).call(this);
