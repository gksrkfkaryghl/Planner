const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
const db = require('../lib/db.js');

router.get('/', function(request, response) {
    var title = "To Do List";
    var statusUI = auth.statusUI(request, response);
    var description = '';
    var list = db.get('toDoList').value();
    if(1 <= list.length) {
        for(var i = 0 ; i < list.length ; i++) {
            description = description + `<div class="todayToDoList"><p><input type="checkbox">${list[i]}</p></div>`
        }
        console.log(list);
    } else {
        description = `<p>등록된 할 일이 없습니다.</p>
        <input type="button"  value="오늘의 할일 설정하기" onclick="createToDoList()">
        <script type="text/javascript">
            function createToDoList() {
                location.href = "/page/create_ToDoList";
            }
        </script>`
    }

    var html = template.HTML(title, description, statusUI);
    response.send(html);
});

module.exports = router;