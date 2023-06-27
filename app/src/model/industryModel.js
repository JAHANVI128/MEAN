const mongoose = require('mongoose')
const Schema = mongoose.Schema

let IndustrySchema = new Schema({
    name:{
        type: String,
        required: {
            value:true,
            message: 'Please enter Industry name'
        },
        lowercase:true
    }
})

module.exports = mongoose.model("Industry",IndustrySchema)