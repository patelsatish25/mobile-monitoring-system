const mongodb = require('mongoose');
const usershema = mongodb.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "rejected", "approved"],
        default: "pending"
      },
    type:String,
    email: { type: String, require: true },
    date:{type:Number,require:true}
})
const userModel = mongodb.model("users", usershema);
module.exports = userModel;