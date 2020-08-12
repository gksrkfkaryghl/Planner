const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
const db = require('../lib/db.js');

router.get('/', function(request, response) {
    var title = "To Do List";
    var statusUI = auth.statusUI(request, response);
    var description = '<ul>';
    var achievement_rate = '';
    var control = '';
    var list = db.get('toDoList').value();
    if(1 <= list.length) {
        for(var i = 0 ; i < list.length ; i++) {
            description = description + `<li>${list[i].title}</li>`
        }
        description += '</ul>';
        achievement_rate = `<div id="rate">
                                <div id="rate_text"><div><br><br>달성율(%) : </div><div id="graph_num">0</div></div>
                                <div id="graph"><div id="progress">|</div></div>
                            </div>`;

        
        control = `
        <div class="order"><input type="button" value="수정하기" onclick="updateToDoList()"> <input type="button" value="모두 삭제" onclick="deleteToDoList()"></div>`
        console.log(list);
    } else {
        description = `<p>등록된 할 일이 없습니다.</p>`
        control = `<div class="order"><input type="button" value="오늘의 할일 설정하기" onclick="createToDoList()"></div>`
    }

    var html = template.HTML(title, description, achievement_rate, control, statusUI);
    response.send(html);
});

module.exports = router;