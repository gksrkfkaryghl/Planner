const express = require('express');
const app = express();
var template = require('./lib/template.js');
const bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
const cors = require('cors');
var db = require('./lib/db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(compression());
app.use(session({
    secret: 'asdf',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
      secure: false
      }
}))
app.use(flash());
app.use(cors({
    origin: "http://localhost:3000", // server의 url이 아닌, 요청하는 client의 url
    credentials: true
    })
);

var indexRouter = require('./routes') ;
var pageRouter = require('./routes/page') ;
var passport = require('./lib/passport')(app);
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter) ;
app.use('/page', pageRouter) ;
app.use('/auth', authRouter) ;

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!') ;
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('someting broke!') ;
});

app.listen(3000, '0.0.0.0', function() {
    console.log('planner app listening on port 3000!') ;
});

// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'nibc663927',
//     database: 'data'
// });

// db.connect() ;

// var app = http.createServer(function(request, response){
//     var _url = request.url ;
//     var queryData = url.parse(_url, true).query ;
//     var pathname = url.parse(_url, true).pathname ;
//     if(pathname === '/'){
//         if(queryData.id === undefined) {
//             db.query(`SELECT`)
//         }
//     }
//     if(pathname === '/to_do_list') {
//         db.query(`select *, IFNULL(checklist,'널입니다') null_check
//         from checklist`, function(error, topics))

//         db.query(`SELECT * FROM checklist`, function(error, topics) {

//         }
//     }
// })