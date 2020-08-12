const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
const db = require('../lib/db.js');


router.get('/toDoList', function(request, response) {
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


router.get('/create_ToDoList', function(request, response) {
    var title = "Create To Do List";
    var statusUI = auth.statusUI(request, response);
    var html = template.HTML(title, 
    `<form action="/page/create_ToDoList_process" method="post">
        <div id="new_list">
            <div></div>
            <div id="first_list">
                <input type="text" class="list" name="input" placeholder="오늘의 할일 1">
                <div id="added_list"></div>
            </div>
            <div>
                <input type="button" value="항목 추가" onclick="add_List()"> 
                <input type="button" value="항목 삭제" onclick="delete_List()">
            </div>
            <div id="listCount"><input type="hidden" name="listCount" value=1></div>
        </div>
        <p id="submit"><input type="submit" value="완료"></p>
    </form>
    `, '', '', statusUI);
    response.send(html);
});


router.post("/create_ToDoList_process", function(request, response) {
    var post = request.body;
    var listCount = post.listCount;
    var list = new Array();
    if(listCount == 1) {
        list[0] = post.input;
    } else {
        list = post.input;
    }
    
    var listNum = 0;
    for(var i = 0 ; i < listCount; i++) {
        if(list[i] != "") {
            db.get('toDoList').push({
                title: list[i],
                num: listNum
            }).write();
            listNum++;
        }  
    }

    response.redirect('/page/toDoList');
});

router.get("/update_ToDoList", function(request, response) {
    var list = db.get('toDoList').value();
    var title = "To Do List - 수정"; 
    var description = "";
    var statusUI = auth.statusUI(request, response);

    for(var i = 0; i < list.length; i++) {
        description += `
        <div id='list_${i+1}'><p><input type='text' name='input' class='list' placeholder='오늘의 할일${i+1}' value="${list[i].title}"></p></div>`;
    }
    
    var html = template.HTML(title,
    `
    <form action="/page/update_ToDoList_process" method="post">
        <div id="new_list">
            <div></div>
            <div id="added_list">${description}</div>
            <div id="controler">
                <input type="button" value="항목 추가" onclick="add_List()"> 
                <input type="button" value="항목 삭제" onclick="delete_List()">
            </div>
            <div id="listCount"><input type="hidden" name="listCount" value=${list.length}></div>
        </div>
        <p id="submit"><input type="submit" value="완료"></p>
    </form>
    `, ``, ``, statusUI, list.length);

    response.send(html);
})

router.post('/update_ToDoList_process', function(request, response) {
    var list = db.get('toDoList').value();
    var listcount = list.length;
    for(var i = 0 ; i < listcount ; i++) {
        db.get('toDoList').remove({num:i}).write();
    }
    var post = request.body;
    var listCount = post.listCount;
    var list = new Array();
    if(listCount == 1) {
        list[0] = post.input;
    } else {
        list = post.input;
    }

    var listNum = 0;
    for(var i = 0 ; i < listCount; i++) {
        if(list[i] != "") {
            db.get('toDoList').push({
                title: list[i],
                num: listNum
            }).write();
            listNum++;
        }  
    }
    response.redirect('/page/toDoList');
})

router.get('/delete_toDoList_process', function(request, response) {
    var list = db.get('toDoList').value();
    var listcount = list.length;
    for(var i = 0 ; i < listcount ; i++) {
        db.get('toDoList').remove({num:i}).write();
    }
    response.redirect('/page/toDoList');
})


module.exports = router;