const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://' +
      process.env.DB_USER_PASS +
      '@cluster2.t9xeo.mongodb.net/social-media?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err))
