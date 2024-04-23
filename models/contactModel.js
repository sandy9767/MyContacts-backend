const mongoose = require("mongoose")
const userModel = require("./userModel")

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add a contact number"]
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Contact", contactSchema)

// reference of the model