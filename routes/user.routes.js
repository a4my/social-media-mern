const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
// const uploadController = require('../controllers/upload.controller')

// const cors = require('cors')

// authentication
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)

// Crud user
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.put('/city/:id', userController.updateUserCity)
router.put('/from/:id', userController.updateUserFrom)
router.put('/job/:id', userController.updateUserJob)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

// upload profile picture with Express-FileUpload
// router.post('/upload', uploadController.uploadAvatar)

// // New profile config
// router.get('/profile/:id', userController.userInfo)

module.exports = router
