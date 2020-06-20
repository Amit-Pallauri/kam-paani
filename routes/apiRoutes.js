const { Router} = require('express')
const router = Router()
const { authenticate } = require('../middlewares/authenticate')
const Employee = require('../models/employees')
const Company = require('../models/company')
const {
    signUp,
    signIn,
    signOut,
    createCompany,
    employeeDashboard,
    allComapnies,
    companyDashboard,
    joinCompany,
    joinedCompany,
    resignation
} = require('../controllers/apiController')

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.delete('/signOut', authenticate, signOut)
router.post('/createCompany', authenticate, createCompany)
router.post('/resign', authenticate, resignation)

router.get('/allcompanies', allComapnies)
router.get('/employeedashboard', authenticate, employeeDashboard)
router.get('/companydashboard/:compId', companyDashboard)
router.get('/signup', (_, res)=> { res.render('register') })
router.get('/signin', (_, res)=>{ res.render('login') })
router.get('/createcompany',authenticate, (_, res)=>{ res.render('createCompany') })
router.get('/joinedcompany', authenticate, joinedCompany)
router.post('/join/:id', authenticate, joinCompany)

module.exports = router