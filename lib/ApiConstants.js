
this.Platforms = {
    iOS: "iOS",
    android: "Android",
    mac: "Mac OS",
    winPhone: "Windows Phone",
    custom: "Custom"
};

this.ReleaseTypes =
{
    alpha: "0",
    beta: "1",
    store: "2",
    enterprise: "3"
};

this.Mandatory =
{
    use: "1",
    not_use: "0"
};

this.AllowDownloadStatus =
{
    allow: 0,
    deny: 1
};

this.Notify =
{
    all: "2",
    onlyInstalllers: "1",
    none: "0"
};

this.NotesType =
{
    text: "0",
    markdown: "1"
};

this.Sections = {
    teams: "/teams",
    appTeams: "/app_teams",
    appUsers: "/app_users",
    apps: "/apps",
    teams: "/teams",
    invites: "/invites",
    versions: "/app_versions",
    statistics: "/statistics"
};

this.DeleteStrategy =
{
    purge: "purge",
    soft: "purge"
};

this.restler = require("restler");
this.Methods = {
    get: this.restler.get,
    post: this.restler.post,
    put: this.restler.put,
    delete: this.restler.del
};

this.AccessRights =
{
    FULL: "0",
    UPLOAD_ONLY: "1",
    READ_ONLY: "2",
    UPLOAD_AND_RELEASE: "3"
};
