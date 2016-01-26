(function () {
    var https = require('https');
    //var path = require('path');
    // modules
    var apps = require('./nodejs-hockeyapp/Apps.js');
    var crashes = require('./nodejs-hockeyapp/Crashes.js');
    var feedback = require('./nodejs-hockeyapp/Feedback.js');
    var invites = require('./nodejs-hockeyapp/Invites.js');
    var provisions = require('./nodejs-hockeyapp/ProvisionProfiles.js');
    var users = require('./nodejs-hockeyapp/UsersAndTeams.js');
    var versions = require('./nodejs-hockeyapp/Versions.js');

    var ApiConstants = require('./ApiConstants.js');

    var Api = (function () {


        var rootPath = '/api/2';
        var apiToken;

        function Api(api_token) {
            apiToken = (api_token == null || api_token == "") ? 0 : api_token;
            this.apps = new apps(this);
            this.users = new users(this);
            this.crashes = new crashes(this);
            this.feedback = new feedback(this);
            this.invites = new invites(this);
            this.provisions = new provisions(this);
            this.versions = new versions(this);
            this.constants = ApiConstants;
        }

        function dump_callback(err, b) {
            if (err != null) console.log("Auth error : " + err);
        };

        Api.prototype.login = function (email, password, accessRights, applicationId, cb) {
            //TODO:  to restler
            var httpsOptions = {
                host: 'rink.hockeyapp.net',
                port: 443,
            };
            if (accessRights == null) accessRights = 0;
            if (applicationId == null) applicationId = 0;
            var ApiConstants = require('./ApiConstants.js');
            httpsOptions.path = rootPath + "/auth_tokens";
            httpsOptions.auth = email + ":" + password;
            if (cb == null) cb = dump_callback;

            httpsOptions.agent = new https.Agent(httpsOptions);

            var request = https.request(httpsOptions, function (response) {
                data = '';
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    apiToken = getAccessTokenByAccessRights(JSON.parse(data));
                    if (apiToken == null)
                        return cb("Have no token with specified access rights : " + accessRights, null);
                    return cb(null, apiToken);
                });
                return response.on('error', function (err) {
                    return cb(err, null);
                });
            });

            function getAccessTokenByAccessRights(data) {
                var loginTokens = data.tokens;
                for (var i in loginTokens) {
                    var tokenInfo = loginTokens[i];
                    if (applicationId == tokenInfo.app_id && accessRights == tokenInfo.rights)
                        return tokenInfo.token;
                }
                return null;
            }

            request.end();
        }


        Api.prototype.executeRequest = function (urlKey, method, opts, cb) {
            // TODO: to sync ?
            var opts = JSON.parse(JSON.stringify(opts));
            function loadFiles(opts){
                if (opts == null) return null;
                var fs = require("fs");
                var restler = require("restler");
                for (var i in opts) {
                    if (i == "ipa" || i == "dsym" || i == "notes") {
                        var name = opts[i];
                        var size = fs.statSync(name).size;
                        opts[i] = restler.file(name, null, size);
                    }
                }
                return opts;
            }

            urlKey = "https://rink.hockeyapp.net/api/2"+urlKey;
            opts = loadFiles(opts);
            //console.log(opts+" \n - "+urlKey+" \n - "+apiToken+" \n - "+method);
            var params = {
                multipart: false,
                headers: {
                    'X-HockeyAppToken': apiToken
                }
            }
            if (opts != null){
                params.data =  opts
                params.multipart = true;
            }


            method(urlKey, params
                ).on("complete", function (data, response) {
                if (response.statusCode != 200 && response.statusCode != 201){
                    var err = "Server returns error status : "+response.statusCode;
                    if (data != null && data != ""){
                        err+=" \n data:"+JSON.stringify(data);
                    }
                    return cb(err,null);
                }

                if (data instanceof Error){
                    return cb(data.message,null);
                }

                //console.log("S "+data.status);
                if (data.status == "error")
                    return cb(data.message, null);
                cb(null, data);
            })
        }

        return Api;

    })
    ();

    module.exports = Api;
}).call(this);
