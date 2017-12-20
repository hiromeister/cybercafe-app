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
    usedBy : {type: Schema.Types.ObjectId, ref : "User"},
    active: {type: Boolean, default:false}
	
});

module.exports = mongoose.model('computer', computerSchema);