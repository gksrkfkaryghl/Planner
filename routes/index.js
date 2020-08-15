const express = require('express');
const router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
const db = require('../lib/db.js');

router.get('/', function(request, response) {
    var statusUI = auth.statusUI(request, response);
    console.log(statusUI);
    var html = template.HOME(statusUI);

    response.send(html);
});

module.exports = router;