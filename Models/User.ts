import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content: string,
    createdAt: Date,
}
const messageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now
        
    }
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifycode:string
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAccepting:boolean,
    messages:[Message]
}

const userSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim: true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please use a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifycode:{
        type:String,
        required:[true,"Verify code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAccepting:{
        type:Boolean,
        default:true
    },
    messages:[messageSchema]
})

const UserModel=(mongoose.models.user as mongoose.Model<User>)|| mongoose.model<User>("user",userSchema);
export default UserModel;