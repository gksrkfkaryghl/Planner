const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
const db = require('../lib/db.js');

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
    `, '', statusUI);
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
    console.log("list: ", list, "post:", post, post.listCount, post.input[0])
    
    for(var i = 0 ; i < list.length; i++) {
        db.get('toDoList').push({
            title: list[i],
            num: i
        }).write();
    }

    response.redirect('/');
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
    `, ``, statusUI, list.length);

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

    for(var i = 0 ; i < listCount; i++) {
        db.get('toDoList').push({
            title: list[i],
            num: i
        }).write();
    }
    response.redirect('/');
})

router.get('/delete_toDoList_process', function(request, response) {
    var list = db.get('toDoList').value();
    var listcount = list.length;
    for(var i = 0 ; i < listcount ; i++) {
        db.get('toDoList').remove({num:i}).write();
    }
    response.redirect('/');
})


module.exports = router;