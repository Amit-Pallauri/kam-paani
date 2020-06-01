var { Schema, model } = require("mongoose");

var detailSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    name: {
        type: String
    },
    role: {
        type: String
    },
    current_status: {
        type: String,
        default: 'working'
    },
    joiningdate: {
        type: Date,
        default: Date()
    },
    resignationdate: {
        type: Date
    }
}, {
    timestamps: true
});


var Detail = model("Detail", detailSchema);

module.exports = Detail;