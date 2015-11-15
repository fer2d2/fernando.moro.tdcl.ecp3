'use strict';

angular.module('padelApp')
    .constant("activeTabs", {
        index: 0,
        facilities: 1,
        booking: 2,
        register: 3,
        login: 4
    })
    .constant("webServiceEndpoints", {
        baseRoute: "http://salonso.etsisi.upm.es/miw_serv/padel/",

        _login: "conexion.php",
        //_registerUsername: "username.php",
        //_registerEmail: "email.php",

        loginRoute: function () {
            return this.baseRoute + this._login;
        },
        //registerUsernameRoute: function () {
        //    return this.baseRoute + this._registerUsername;
        //},
        //registerEmailRoute: function () {
        //    return this.baseRoute + this._registerEmail;
        //}

    });