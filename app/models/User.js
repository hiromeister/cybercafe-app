
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var userSchema = mongoose.Schema({	

/*	name:String,
	password: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	role_id: { type: Number, default: 2 }, */
	
	name: String,
	age : Number
});


userSchema.virtual('computers',{
	ref:'computer',
	localField: '_id',
	foreignField:'usedBy'

})

//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);