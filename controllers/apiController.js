const Employee = require('../models/employees')
const Company = require('../models/company')
module.exports = {
    async signUp(req, res){
        try{
            const employee = new Employee({...req.body})
            await employee.save()
            res.redirect('/signin')        
        }catch(err){
            console.log(err)
        }
    },

    async signIn(req, res){
        try{
            const { email, password } = req.body
            const foundEmployee = await Employee.findByEmailAndPass(email, password)
            if (!foundEmployee) return res.send('invalid credentials')
            else {
                req.session.userId = foundEmployee._id
                res.redirect('/employeedashboard')
                // console.log(req.session.userId)
            }       
        }catch(err){
            console.log(err.message)
            res.redirect('/signIn')
        }
    },

    async signOut(req, res){
        try{
            req.session.destroy()
            res.redirect('/signIn')
        }catch(err){
            console.log(err.message)
        }
    }, 

    async createCompany(req, res){
        try{
            const { name } = req.body
            const user = await Employee.findById(req.session.userId)
            const newCompany = new Company({name, ceo: req.session.userId, ceoName : user.name})
            newCompany.save()
            const foundUser = await Employee.findByIdAndUpdate({_id : req.session.userId}, { $push : { companyCreated: newCompany._id} } )
            res.redirect('/allcompanies')
        }catch(err){
            console.log(err.message)
        }
    },
}