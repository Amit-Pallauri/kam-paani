const { Schema, model } = require('mongoose')
const { hash, compare }= require('bcrypt')


const employeeSchema = new Schema({
    name: {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        reuired : true,
        trim : true
    },
    companyJoined : {
        type : Schema.Types.ObjectId,
        ref : 'Company'
    },
    companyCreated: [{
        type : Schema.Types.ObjectId,
        ref : 'Company'
    }],
    companyLeft: {

    },
    working: {
        type: Boolean,
        default :false
    },
    role: {
        type: String
    },
    joiningDate : {
        type : Date,
        required: false,
    },
    resignDate : {
        type : Date,
        required : false
    }
}, 
{ timestamps : true })

employeeSchema.statics.findByEmailAndPass = async (email, password)=>{
    try {
        const user = await Employee.findOne({ email })
        if(!user) throw new Error("invalid credentials")
        const isMatched = await compare(password, user.password)
        if(!isMatched) throw new Error("invalid credentials")
        return user
    } catch (error) {
        throw error
    }
}

employeeSchema.pre("save", function(next){
    var user = this;
    if(user.isModified("password")){
        hash(user.password, 10).then(function(hashedPassword){
            user.password = hashedPassword;
            next();
        }).catch(function(err){
            next(err);
        })
    }
})

const Employee = model('Employee', employeeSchema)
module.exports = Employee