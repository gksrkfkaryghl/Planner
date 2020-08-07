module.exports = {
    HTML: function(title, body, control, statusUI = `<div class="top-menu"></div>
    <div class='top-menu'><a href="/auth/login">Sign-in</a> | </div>
    <div class='top-menu'><a href="/auth/register">Sign-up</a></div>
    <div class="top-menu"></div>`, list_num = 1) {
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="/stylesheets/plan.css">
        </head>
        <body>
            <script type="text/javascript">
                var list_num = ${list_num}; 
                function add_List() {
                    if(list_num == 1) {
                        list_num = 2;
                    } else {
                        list_num += 1; 
                    }
                    var added_list = document.getElementById("added_list");
            
                    var str = "";
                    str += "<p><input type='text' name='input' class='list' placeholder='오늘의 할일" + list_num + "'></p>";
            
                    var addedDiv = document.createElement("div");
                    addedDiv.id = "list_" + list_num;
                    addedDiv.innerHTML = str;
                    added_list.appendChild(addedDiv);
            
                    document.getElementById("listCount").innerHTML = "<input type='hidden' name='listCount' value=" + list_num + ">";
                }
            
                function delete_List() {
                    if(list_num == 1) {
                        alert('더 이상 삭제할 수 없습니다.');
                        return;
                    } else {
                        var added_list = document.getElementById("added_list");
                        var addedDiv = document.getElementById("list_" + list_num)
                        added_list.removeChild(addedDiv);
                        list_num -= 1;
                        console.log(added_list);
            
                        document.getElementById("listCount").innerHTML = "<input type='hidden' name='listCount' value=" + list_num + ">";
                    }
                }

                function createToDoList() {
                    location.href = "/page/create_ToDoList";
                }

                function updateToDoList() {
                    location.href = "/page/update_ToDoList";
                }
                
                function deleteToDoList() {
                    var del_confirm = confirm("모두 삭제하시겠습니까?");
                    if(del_confirm) {
                        location.href = "/page/delete_toDoList_process";
                    }
                }
            </script>
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
                        <div class='menu_list'><a href="/">Today's to do list</a></div>
                        <div class='menu_list'><a href="/page/calendar">Calendar</a></div>
                        <div class='menu_list'><a href="/page/library">My library</a></div>
                        <div class='menu_list'><a href="/page/diary">Diary</a></div>
                    </div>
                    <div id='content'>  
                        <div id='topic'>${title}</div>
                        <div id='description'><p>${body}</p></div>
                        <div id="control">${control}</div>
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