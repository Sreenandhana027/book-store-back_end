const express = require('express')

const userController = require('../controllers/userController')

// book controllser to add books
const bookController = require('../controllers/bookController')

// *JWT middleware
const jwtmiddleware = require('../middleware/jwtmiddleware')

// *multer middleware

const multerConfiq = require('../middleware/multermiddleware')

// *adminJWT
const adminjwtMiddleware = require('../middleware/adminJwtmiddleware')
const jwtMiddleware = require('../middleware/jwtmiddleware')

// router of express
const route = express.Router()

route.post('/api/register', userController.userRegister)

route.post('/api/login', userController.userLogin)

route.post('/api/google-login', userController.GoogleLogin)

// ** to add book
route.post('/api/addBook', jwtmiddleware, multerConfiq.array('UploadedImages', 3), bookController.addBook)

// **to get book
route.get('/api/get-book', jwtmiddleware, bookController.getAllBooks)

route.get('/api/get-home-books', bookController.getHomeBooks)

route.get('/api/getBookById/:id', jwtmiddleware, bookController.getBookById)


// ** GET USER AND GET BOOKS
route.get('/api/getUsers', adminjwtMiddleware, userController.getUsers)

// route.get('/api/getBooks',bookController.getBooks)
route.get('/api/getbooksAdmin', adminjwtMiddleware, bookController.getAllBooks)

// ** update Profile Admin
route.put('/api/update-admin', adminjwtMiddleware, multerConfiq.single('profile'),userController.updateAdmin)

route.get('/api/get-admin',adminjwtMiddleware,userController.getAdmin)


// ** update User
route.put('/api/update-user',jwtmiddleware,multerConfiq.single('profile'),userController.updateUser)

// ** get user to update
route.get('/api/get-user',jwtMiddleware,userController.getUserUpdate)

// **  for payments

route.put('/api/makePayment',jwtMiddleware,bookController.buyBook)

module.exports = route