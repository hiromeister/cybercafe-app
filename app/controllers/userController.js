var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

var User = require('../models/User');

class userController{

    add(req, res){
        let userCreated = new User(req.body);
        userCreated.save().then(item => {
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

    delete(req, res){
        let user = req.body;
        User.findByIdAndRemove({_id: req.params.id}, user, (err) => {
            if (err) throw err;
            res.redirect('/liste-adherants');
        })
    }

    showEdit(req, res){
        User.findById(req.params.id).then(user => {
            res.render('admin/edituser', { user : user });
        })
    }

    edit(req, res){
        let user = req.body;
        User.findByIdAndUpdate({ _id: req.params.id }, user, (err) =>{
            if(err) throw err;
            res.redirect('/liste-ordinateurs');
        })
    }
   
}

module.exports = new userController();
