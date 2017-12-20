var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

var Computer = require('../models/computer');
var User = require('../models/user');

class computerController{

    list(req, res){
      
        Computer.find({}, function(err, computer){
            res.render('admin/computers.ejs', {computer: computer});
        })
    }

    add(req, res){

        let computerCreated = new Computer({
            type: req.body.type,
            gpu : req.body.gpu,
            cpu : req.body.cpu,
            memory : req.body.memory,
            cm : req.body.cm,
            usedBy : null,

        });
        computerCreated.save()
        .then(item => {
            res.redirect('/liste-ordinateurs');
        })
        .catch(err => {
            res.status(400).send("Impossible de sauvegarder dans la db");
        })
    }

   /*  showAttribution(req, res){
        Computer.find({_id: req.params.id}, (err, computer)=>{
            res.render('admin/usedBy.ejs',{computer:computer});
        })
    }/ 

    UsersModel.find().populate('computerId').exec(function(err, users) {
        if (err) throw err;
        console.log(users); // display users with affected computers if exists
    }); */

    showAttribution(req, res){
        User.find({_id: req.params.id}).populate('computerId').exec(function(err, users){
            if(err) throw err;
            console.log(users);
        })
    }


    attribution(req, res){
        Computer.findByIdAndUpdate({_id: req.params.id}, {$set: {gpu: req.body.gpu}} , () => {
           res.redirect('/liste-ordinateurs');
        })

        
    }

}

module.exports = new computerController();