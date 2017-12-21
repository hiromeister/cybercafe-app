
var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/User');
var bcrypt = require('bcrypt-nodejs');
var constant = require('../config/constants');
var dateFormat = require('dateformat');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        process.nextTick(function() {s
        User.findOne({ 'mail' :  email }, function(err, user) {

            if (err) return done(err);
            
            if (user) {
                return done(null, false, req.flash('error', 'That email is already taken.'));
            } else {
            	
            	
           User.find().sort([['_id', 'descending']]).limit(1).exec(function(err, userdata) {
               var newUser = new User(); 
               var day =dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");
               var active_code=bcrypt.hashSync(Math.floor((Math.random() * 99999999) *54), null, null);
                    
                    newUser.email    = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.name = req.body.username;
                    newUser.created_date = day;
                    newUser.updated_date = day;
                    newUser.status = 'active';
                
                    newUser.save(function(err) {
                    if (err) throw err;

                    return done(null, newUser,req.flash('success', 'Account Created Successfully'));
                    
                    req.session.destroy();
                
                });
                
              });
           
                
            }

        });    

        });

        
    }));
    
    passport.use('local-login', new LocalStrategy({
       
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 
        User.findOne({ 'email' :  email }, function(err, user) {
            
            if (err) return done(null, false, req.flash('error', err));
            if (!user) return done(null, false, req.flash('error', 'Sorry Your Account Not Exits ,Please Create Account.')); 
            if(user.status === 'inactive') return done(null, false, req.flash('error', 'Your Account Not Activated ,Please Check Your Email')); 

            req.session.user = user;
		
            return done(null, user);
        });

    }));

};

    
    





   