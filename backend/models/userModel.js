import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},
}, {minimize:false}) // Ensure empty objects (e.g., cartData) are saved in the database

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel