const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

router.get('/', function(request, response) {
    var title = "To Do List";
    var statusUI = auth.statusUI(request, response);

    var html = template.HTML(title, 
    `<p>등록된 할 일이 없습니다.</p>
    <form action="/write">
        <button><a href="/page/create_toDo>">오늘의 할일 설정하기</a></button>
    </form>`, statusUI);
    response.send(html);
});

module.exports = router;