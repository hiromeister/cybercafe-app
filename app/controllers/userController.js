var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var User = require('../models/user');

class userController{

    add(req, res){
        let userCreated = new User(req.body);
        userCreated.save()
        .then(item => {
            res.redirect('/liste-adherants');
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        })
    }

    list(req, res){
        User.find({}, function(err, user){
            res.render('admin/users.ejs', {user: user});
        })
    }

   
}

module.exports = new userController();
