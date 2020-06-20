const { Schema, model } = require('mongoose')

const companySchema = new Schema({
    name:{
        type : String,
        required: true,
        trim : true
    },
    ceo:{
        type: Schema.Types.ObjectId,
        ref: 'Employee' 
    },
    ceoName:{
        type: String
    },
    curEmployees: [{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }],
    exEmployees:[{
        type : Schema.Types.ObjectId,
        ref: 'Employee' 
    }]
},
{ timestamps: true }
)

module.exports = model('Company', companySchema)