var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');
var Computer = require('../models/Computer');
var User = require('../models/User');

class computerController{

    list(req, res){
        User.find({}).then(users => {
        Computer.find({}).populate('usedby').then(computers => {
            res.render('admin/computers.ejs', { computers: computers, users: users });
        });
        })
   
    }

    showEdit(req, res){
        User.find({}).then( users => {
          Computer.findById(req.params.id).then(computer =>{
            res.render('admin/editcomputer.ejs', {computer:computer, users: users});
            })    
        })
    }

    edit(req, res){
        let computer = req.body;
        Computer.findByIdAndUpdate({ _id: req.params.id }, computer, (err) =>{
            if(err) throw err;
            res.redirect('/liste-ordinateurs');
        })
    }
       
    add(req, res){
        let computerCreated = new Computer(req.body);
        computerCreated.save() .then(item => {
            res.redirect('/liste-ordinateurs');
           })
       } 

   delete(req, res){
       let computer = req.body;
       Computer.findByIdAndRemove({_id: req.params.id}, computer, () => {
           res.redirect('/liste-ordinateurs');
       })
   }

   inactive(req, res){
       Computer.findByIdAndUpdate({_id: req.params.id}, {$set:{usedby: [] }}, () => {
           res.redirect('/liste-ordinateurs');
       })
   }

}

module.exports = new computerController();

    
