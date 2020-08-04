var express = require('express');
const router = express.Router();
var template = require('../lib/template.js'); 
var db = require('../lib/db');
const bcrypt = require('bcrypt');
var shortid = require('shortid');
const { has } = require('../lib/db');


module.exports = function(passport) {

    router.get('/login', function(request, response) {
        var fmsg = request.flash();
        var feedback = "";
        if(fmsg.error) {
            feedback = fmsg.error[0];
        }
        console.log('error feedback : ', feedback);
        var title ='My Planner';
        var html = template.LOGIN(title, 
        `<div style="color:red">${feedback}</div>
        <form action="/auth/login_process" method="post">
            <p><input type="text" class="input_sign" name="id" placeholder="아이디"></p>
            <p><input type="password" class="input_sign" name="password" placeholder="비밀번호"></p>
            <br><p><input type="submit" class="input_sign" value="로그인"></p>
        </form>
        `);
        response.send(html);
    })


    router.post("/login_process",
        passport.authenticate('local', {
            //successRedirect: '/',
            failureRedirect : '/auth/login',
            badRequestMessage: '빈칸을 빠짐없이 입력해주세요.',
            failureFlash : true
        }),
        function(req, res) {
            req.session.save(function() {
                console.log('세션 저장확인 완료');
                res.redirect('/');
            });
        });

    router.get('/logout', function(request, response) {
        request.logout();
        request.session.save(function(){
            response.redirect('/');
        });
    });


    router.get('/register', function(request, response) {
        var fmsg = request.flash();
        var feedback = "";
        if(fmsg.error) {
            feedback = fmsg.error[0];
        }
        var title = 'Register';
        var html = template.LOGIN(title, 
            `<div style="color:red">${feedback}</div>
            <form action="/auth/register_process" method="post">
            <p><input type="text" class="input_sign" name="id" placeholder="id"></p>
            <p><input type="password" class="input_sign" name="password" placeholder="password"></p>
            <p><input type="password" class="input_sign" name="password2" placeholder="confirm_password"></p>
            <p><input type="text" class="input_sign" name="nickname" placeholder="nickname"></p>
            <p><input type="submit" class="input_sign" value="login"></p>
            </form>
        `);
        response.send(html);
    });

    router.post('/register_process', function(request, response) {
        var post = request.body;
        var id = post.id;
        var password = post.password;
        var password2 = post.password2;
        var nickname = post.nickname;
        
        if( !(id && password && password2 && nickname) ) {
            request.flash('error', "빈칸을 빠짐없이 입력해주세요.");
            response.redirect('/auth/register');
        } else if(password != password2) {
            request.flash('error', "비밀번호가 같지 않습니다.");
            response.redirect('/auth/register');
        } else {
            bcrypt.hash(password, 10, function(err, hash) {
                var user = {
                    shortid:shortid.generate(),
                    id:id,
                    password:hash,
                    nickname:nickname
                }
                db.get('users').push(user).write();
                request.login(user, function(err) {
                    return response.redirect('/');
                });
            });
        }
    })


    return router;
}