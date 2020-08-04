const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

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
        str += "<p><input type='text' name='list" + list_num + "' placeholder='오늘의 할일" + list_num + "'></p>";

        var addedDiv = document.createElement("div");
        addedDiv.id = "list_" + list_num;
        addedDiv.classList.add("list");
        addedDiv.innerHTML = str;
        added_list.appendChild(addedDiv);
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
        }
    }
    </script>
    <form action="/create_ToDoList_process">
        <p><input type="text" class="list" name="list1" placeholder="오늘의 할일 1">
        <input type="button" value="항목 추가" onclick="add_List()"> 
        <input type="button" value="항목 삭제" onclick="delete_List()"><p>
        <div id="added_list"><div>
    </form>
    `, statusUI);
    response.send(html);
});

module.exports = router;