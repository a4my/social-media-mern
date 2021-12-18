const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://social-media:mern1234@cluster2.t9xeo.mongodb.net/social-media-mern',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err))
