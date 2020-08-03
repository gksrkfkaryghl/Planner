var db = require('./db');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

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

  return passport ;
}