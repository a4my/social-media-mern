const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const { uploadErrors } = require('./utils/errors.utils')
const UserModel = require('./models/user.model')
const postModel = require('./models/post.model')

const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

// Avatar upload
app.use(fileUpload())
app.post('/api/user/upload', async (req, res) => {
  // check for errors
  try {
    if (!req.files.file.name.match(/\.(png|jpg|jpeg)$/))
      throw Error('invalid file')
    if (req.files.file.size > 500000) throw Error('max size')
    if (!req.files || Object.keys(req.files).length === 0)
      throw Error('no file')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json({ errors })
  }

  // change the name of the file to the user's name
  let fileName = req.body.name + '.jpg'
  req.files.file.name = fileName

  // store the uploaded file into a variable
  const uploadedFile = req.files.file
  const uploadPath = `${__dirname}/../client/public/uploads/profil/${fileName}`

  // Add to server and datatbase
  try {
    uploadedFile.mv(uploadPath)

    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: './uploads/profil/' + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(500).send({ message: err })
      }
    )
  } catch (err) {
    return res.status(500).send({ message: err })
  }
})

// Add a picture in a post
app.post('/api/post/', async (req, res) => {
  try {
    if (!req.files.file.name.match(/\.(png|jpg|jpeg)$/))
      throw Error('invalid file')
    if (req.files.file.size > 500000) throw Error('max size')
    if (!req.files || Object.keys(req.files).length === 0)
      throw Error('no file')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json({ errors })
  }

  //   // change the name of the file to the user's name
  let fileName = req.body.posterId + '-' + Date.now() + '.jpg'
  req.files.file.name = fileName

  // // store the uploaded file into a variable
  const uploadedFile = req.files.file
  const uploadPath = `${__dirname}/../client/public/uploads/posts/${fileName}`

  uploadedFile.mv(uploadPath)

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? './uploads/posts/' + fileName : '',
    video: req.body.video,
    likers: [],
    comments: []
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    return res.status(400).send(err)
  }
})

// CORS config
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(helmet())
app.use(morgan('common'))

// JWT
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// user routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// Config for deployment
app.use(express.static(path.resolve(__dirname, './client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
