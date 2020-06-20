var { Schema, model } = require("mongoose");

var detailSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    workingEmployee: [{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }],
    exEmployees:[{
        type : Schema.Types.ObjectId,
        ref: 'Employee' 
    }],
    name: {
        type: String
    },
    role: {
        type: String
    }
}, {
    timestamps: true
});


var Detail = model("Detail", detailSchema);

module.exports = Detail;