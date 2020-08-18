var db = require('./db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

module.exports = function(app) {
    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var user = db.get('users').find({id:id}).value();
    console.log('deserializeUser', id, user);
    done(null, user);
  });


passport.use(new LocalStrategy(
    {
        usernameField: 'id'
    },
    function(id, password, done) {
      var user = db.get('users').find({
        id:id
      }).value();
      if(user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if(result) {
            return done(null, user);
          }
          else {
            console.log('err1');
            return done(null, false, {
              message: '비밀번호가 틀렸습니다.'
              });
          }
        });
      } else {
        console.log('err2');
          return done(null, false, {
            message: '존재하지 않는 계정입니다.'
          })
        }
    }
  ));
    var facebookCredentials = require('../config/facebook.json');
    facebookCredentials.profileFields = ['id', 'emails', 'name', 'displayName'];

    passport.use(new FacebookStrategy(facebookCredentials,
    function(accessToken, refreshToken, profile, done) {
      console.log('FacebookStrategy : ', accessToken, refreshToken, profile);

      var email = profile.emails[0].value;
      var user = db.get('users').find({id:email}).value();
      if(user){
        user.facebookId = profile.id;
        db.get('users').find({id:email}).assign(user).write();
      } else {
          user = {
              shortid:shortid.generate(),
              id:email,
              displayName:profile.displayName,
              facebookId:profile.id
          }
          db.get('users').push(user).write();
      }
      done(null, user);

      // var id = profile.id[0].value;
      // var user = db.get('users').find({id:id}).value();
      // if(user) {
      //   user.facebookId = profile.facebookid;
      //   db.get('users').find({id:id}).assign(user).write();
      // } else {
      //   user = {
      //     shortid:shortid.generate(),
      //     id:id,
      //     nickname:nickname,
      //     facebookId:profile.facebookid
      //   }
      //   db.get('users').push(user).write();
      // }  
      // done(null,user);
    }
  ));

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope:'email'
  }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', 
    { 
      successRedirect: '/',
      failureRedirect: '/auth/login' 
    })); 

  return passport ;
}