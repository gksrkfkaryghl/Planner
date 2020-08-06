const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
const db = require('../lib/db.js');

router.get('/create_ToDoList', function(request, response) {
    var title = "Create To Do List";
    var statusUI = auth.statusUI(request, response);
    var html = template.HTML(title, 
    `<script>
    var list_num = 1; 
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
    </script>
    <form action="/page/create_ToDoList_process" method="post">
        <div id="new_list">
            <div></div>
            <div id="first_list">
                <input type="text" class="list" name="input" placeholder="오늘의 할일 1">
                <div id="added_list"></div>
            </div>
            <div id="controler">
                <input type="button" value="항목 추가" onclick="add_List()"> 
                <input type="button" value="항목 삭제" onclick="delete_List()">
            </div>
            <div id="listCount"><input type="hidden" name="listCount" value=1></div>
        </div>
        <p><br><input type="submit" value="완료"></p>
    </form>
    `, statusUI);
    response.send(html);
});


router.post("/create_ToDoList_process", function(request, response) {
    var post = request.body;
    var listCount = post.listCount;
    var list = post.input;
    console.log("list: ", list, "post:", post, post.listCount, post.input[0])
    
    for(var i = 0 ; i < listCount; i++) {
        db.get('toDoList').push(list[i]).write();
    }

    response.redirect('/');
});

module.exports = router;