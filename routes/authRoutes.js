const { Router } = require('express')
const router = Router()
const { 
    getLoginPage, 
    getRegisterPage,
    registerNewUser,
    loginUser,
    // logout
} = require('../controllers/authControllers')
// const { guest } = require('../middlewares/auth')

router.get('/login', getLoginPage)
router.get('/signup', getRegisterPage)
router.post('/signup', registerNewUser)
router.post('/login', loginUser)
// router.get('/logout', logout)

module.exports = router