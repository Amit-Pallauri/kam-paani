const { Router} = require('express')
const router = Router()
const { authenticate } = require('../middlewares/authenticate')
const Employee = require('../models/employees')
const Company = require('../models/company')
const {
    signUp,
    signIn,
    signOut,
    createCompany
} = require('../controllers/apiController')

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.delete('/signOut', signOut)
router.post('/createCompany', authenticate, createCompany)

router.get('/signup', (_, res)=> { res.render('register') })
router.get('/signin', (_, res)=>{ res.render('login') })
router.get('/createcompany',authenticate, (_, res)=>{ res.render('createCompany') })
router.get('/joinedcompany', authenticate, (_, res)=> { res.render('joinedCompany')})

router.get('/allcompanies', async( req, res)=> { 
    try{
        const companies = await Company.find({})

        res.render('allCompanies', { companies })
    }catch(err){
        console.log(err)
    }
})

router.get('/employeedashboard', authenticate, async(req, res)=>{
    try{
        const foundEmployee = await Employee.find({_id : req.session.userId})
        if (foundEmployee.working == false) return res.render('employeeDashboard', {  employee : foundEmployee[0].name, employeed : false })
        else return res.render('employeeDashboard', { employee : foundEmployee[0].name, employeed : true })
    }catch(err){
        console.log(err)
    }
})

router.get('/companydashboard', async(req, res)=>{
    try{
        
    }catch(err){
        console.log(err)
    }
})


module.exports = router