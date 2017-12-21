var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({	
	name: String,
	email: String,
	age : Number,
	password: { type: String, required: true },
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
});

userSchema.virtual('computers',{
	ref:'computer',
	localField: '_id',
	foreignField:'usedBy'

})

userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);