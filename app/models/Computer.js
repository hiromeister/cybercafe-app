var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var computerSchema = mongoose.Schema({	
    name: String, 
    type: String, 
    gpu: String,
    cpu: String, 
    memory: String,
    cm: String,
    active: {type: Boolean, default:false},
    usedby : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
           
        }
    ]
    
	
});

module.exports = mongoose.model('computer', computerSchema);