const { result } = require("./db");

module.exports = {
    isOwner : function(request, response) {
        if(request.user) {
            return true;
        } else {
            return false;
        }
    },

    statusUI : function(request, response) {
        var authstatusUI = `<div class="top-menu"></div>
        <div class='top-menu'><a href="/auth/login">Sign-in</a></div>
        <div class="top-menu">|</div>
        <div class='top-menu'><a href="/auth/register">Sign-up</a></div>
        <div class="top-menu"></div>`
        if(this.isOwner(request, response)) {
            authstatusUI = `<div class="top-menu"></div>
            <div class='top-menu'>${request.user.nickname}</div>
            <div class="top-menu">|</div>
            <div class='top-menu'><a href="/auth/logout">Logout</a></div>
            <div class="top-menu"></div>`
        }
        return authstatusUI;
    }
}