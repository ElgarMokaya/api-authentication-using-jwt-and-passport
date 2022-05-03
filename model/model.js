const mongoose=require('mongoose')
const bcrypt=require('bcrypt')



const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


//hashing user password
UserSchema.pre('save',async(next)=>{
const user=this
const hash=await bcrypt.hash(this.password,10)

this.password=hash
next()
})

UserSchema.methods.isValidPassword=(password)=>{
    const user=this;
    const compare=await.bcrypt.compare(password,user.password)
    return compare

}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;