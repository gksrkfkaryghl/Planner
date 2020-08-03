module.exports = {
    HTML: function(title, body, statusUI = `<div class="top-menu"></div>
    <div class='top-menu'><a href="/auth/login">Sign-in</a> | </div>
    <div class='top-menu'><a href="/auth/register">Sign-up</a></div>
    <div class="top-menu"></div>`) {
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="/stylesheets/plan.css">
        </head>
        <body>
            <div id='top'>
                <div id='access'>
                    ${statusUI}
                </div>
                <br>
                <h1>My Mission Planner</h1>
            </div>
            <div id="empty"></div>
            <div id='container'>
                <div id='grid'>
                    <div id='menu'>
                        <div class='menu_list'><a href="/page/to_do_list">Today's to do list</a></div>
                        <div class='menu_list'><a href="/page/calendar">Calendar</a></div>
                        <div class='menu_list'><a href="/page/library">My library</a></div>
                        <div class='menu_list'><a href="/page/diary">Diary</a></div>
                    </div>
                    <div id='content'>  
                        <div id='topic'>${title}</div>
                        ${body}
                    </div>
                </div>
            </div>
        </body>
        </html>`
    },

    LOGIN : function(title, body) {
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="/stylesheets/plan.css">
        </head>
        <body>
            <div class="login">
            <div id="title">${title}</div>
            <div id="login-box">
                ${body}
            </div>
            </div>
        </body>
        </html>
        `
    }
}