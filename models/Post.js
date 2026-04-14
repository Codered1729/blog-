import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title :{type : String,required : true},
    content : {type : String, required : true},
    date : {type : String, required: true},
    imageUrl : {type : String, required : false}
    
})


export default mongoose.model("Post",postSchema);