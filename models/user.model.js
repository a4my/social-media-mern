const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 1000,
      minlength: 6
    },
    picture: {
      type: String,
      default: './uploads/profil/default-user.png'
    },
    bio: {
      type: String,
      maxlength: 1000
    },
    city: {
      type: String,
      maxlength: 50
    },
    from: {
      type: String,
      maxlength: 50
    },
    job: {
      type: String,
      maxlength: 50
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)

// Password crypting before sending to database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Incorrect password!')
  }
  throw Error('Incorrect email!')
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
