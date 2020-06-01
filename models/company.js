const { Schema, model } = require('mongoose')

const companySchema = new Schema({
    name:{
        type : String,
        required: true,
        trim : true
    },
    ceo:{
        type: Schema.Types.ObjectId 
    },
    ceoName:{
        type: String
    },
    employees : [{
        type : Schema.Types.ObjectId
    }]
},
{ timestamps: true }
)

module.exports = model('Company', companySchema)