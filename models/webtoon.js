import mongoose from "mongoose";

const WebtoonsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"title are required"],
    },
    summary:{
        type: String,
        required: [true,"summary are required"],
    },
    characters:{
        type: String,
        required: [true,"Character are required"],
    },
    imgUrl:{
        type: String, 
    },
    refreshToken:{
        type: String,
    
    }

},{timestamps:true});



WebtoonsSchema.methods.generateAcessToken = function() {
   return jwt.sign(
        {
            _id: this._id,
            title: this.username,
            summary: this.email,
            characters: this.fullname,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
WebtoonsSchema.methods.generateRefreshToken = function() {
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

const Webtoons = mongoose.model('Webtoons', WebtoonsSchema);


export default Webtoons