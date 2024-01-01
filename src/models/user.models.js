import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:true,
        required:true
    },
    WatchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if (this.password.isModified("password")) return next() ;
    this.password = bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
       return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    Jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    Jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    }
    )
}

export const User = mongoose.model("User",userSchema)