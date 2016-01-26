(function() {
  var UsersAndTeams;

  UsersAndTeams = (function() {

    var ApiConstants = require('./../ApiConstants.js')

    function UsersAndTeams(parent) {
      this.parent = parent;
    }

    UsersAndTeams.prototype.listTeams = function(opts, cb) {
      return this.parent.executeRequest(ApiConstants.Sections.teams, ApiConstants.Methods.get, opts, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.listAppTeams = function(appId, cb) {
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appTeams, ApiConstants.Methods.get, null, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.listAppUsers = function(appId,  cb) {
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appUsers, ApiConstants.Methods.get, null, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.addTeamToApp = function(appId, teamId,  cb) {
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appTeams+"/"+teamId, ApiConstants.Methods.put, null, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.inviteUser = function(appId, email, opts, cb) {
      // TODO: validation
      if (email == null || email == "")
          return cb("User email missed");
      opts.email = email;
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appUsers, ApiConstants.Methods.post, opts, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.checkMembers = function(appId, userEmail, appSecret, cb) {
      if (email == null || email == "")
        return cb("User email missed");
      if (appSecret == null || appSecret == "")
        return cb("App secret missed");
      var opts =
      {
        email : userEmail,
        secret : appSecret
      }
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appUsers, ApiConstants.Methods.get, opts, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.updateUser = function(appId, role, tags, cb) {
      var opts = {};
      if (role != null) opts.role = role;
      if (tags != null) opts.tags = tags;
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appUsers, ApiConstants.Methods.put, opts, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.removeTeamFromApp = function(appId, teamId, cb) {
      var opts = {};
      if (role != null) opts.role = role;
      if (tags != null) opts.tags = tags;
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appTeams+"/"+teamId, ApiConstants.Methods.delete, null, function (err, data) {
        return cb(err, data);
      });
    };

    UsersAndTeams.prototype.removeUserromApp = function(appId, userId, cb) {
      var opts = {};
      if (role != null) opts.role = role;
      if (tags != null) opts.tags = tags;
      return this.parent.executeRequest("/"+appId+ApiConstants.Sections.appUsers+"/"+userId, ApiConstants.Methods.delete, null, function (err, data) {
        return cb(err, data);
      });
    };


    return UsersAndTeams;

  })();

  module.exports = UsersAndTeams;

}).call(this);
