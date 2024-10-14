import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
   username:{
    required: true,
    type: String,
    minlength: 3,
    maxlength: 20
   },
   email:{
    required: true,
    type: String,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
   fullname:{
    required: true,
    type: String,
   },
   password:{
    type: String,
    required: [true,"password required"],

   },
   refreshToken:{
    type: String,

   }

},{timestamps:true})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } 
    );
};

UserSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY,
        }
    )
}

const User = mongoose.model('User',UserSchema);

export default User;