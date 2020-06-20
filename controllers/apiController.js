const Employee = require('../models/employees')
const Company = require('../models/company')
module.exports = {
    async signUp(req, res){
        try{
            const employee = new Employee({...req.body})
            await employee.save()
            res.redirect('/signin')        
        }catch(err){
            console.log(err.message)
            res.redirect('/signUp')
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

    async allComapnies( _, res){ 
        try{
            const companies = await Company.find({})
            res.render('allCompanies', { companies })
        }catch(err){
            console.log(err)
        }
    },

    async employeeDashboard(req, res){
        try{
            const foundEmployee = await Employee.find({_id : req.session.userId})
            if (foundEmployee.working == false) return res.render('employeeDashboard', {  employee : foundEmployee[0].name, employeed : false })
            else return res.render('employeeDashboard', { employee : foundEmployee[0].name, employeed : true })
        }catch(err){
            console.log(err)
        }
    },

    async companyDashboard(req, res){
        try{
            compId  = req.params.compId
            userId = req.session.userId
            const foundCompany = await Company.findById(compId).populate('curEmployees').populate('exEmployees')
            const foundUser = await Employee.findById(userId)
            if (!userId || userId == undefined) notWorking = true
            else if (foundUser.working == false) notWorking = true
            else notWorking = false 
            curEmps = foundCompany.curEmployees
            exEmps = foundCompany.exEmployees
            res.render(`companyDashboard`, {compId, curEmps, exEmps, name: foundCompany.name, notWorking})
        }catch(err){
            console.log(err)
        }
    },

    async joinCompany(req, res){
        try{
            role = req.body.name
            user = req.session.userId
            compId = req.params.id
            updatedUser = await Employee.findByIdAndUpdate(user, { working: true, joiningDate : Date(), resignDate: null , role, companyJoined : compId, working: true })
            updatedCompany = await Company.findByIdAndUpdate(compId, { $push : { curEmployees : user }})
            res.redirect(`/companydashboard/${compId}`)
        }catch(err){
            console.log(err.message)
        }
    },

    async joinedCompany(req, res){
        try{
            const userId = req.session.userId
            const foundUser = await Employee.findById(userId).populate('companyJoined')
            res.render('joinedCompany', { user : foundUser, company : foundUser.companyJoined })
        }catch(err){
            console.log(err)
            res.redirect('/joinedcompany')
        }
    },

    async resignation(req, res){
        try{
            userId = req.session.userId
            const user = (await Employee.findById(userId)).depopulate('companyJoined')
            const compId = user.companyJoined
            await Employee.findByIdAndUpdate(userId, { working : false, resignDate : Date(), companyJoined: null, role : null })
            await Company.findByIdAndUpdate(compId, { $push : { exEmployees : userId }}) 
            const depop = (await Company.findById(compId)).depopulate('curEmployees')
            const removedComp = await Company.findById(compId)
            const num = removedComp.curEmployees.indexOf(userId)
            removedComp.curEmployees.splice(num, 1)
            removedComp.save()
            res.redirect('/employeedashboard')
        }catch(err){
            console.log(err)
            res.redirect('/joinedcompany')
        }
    }
}