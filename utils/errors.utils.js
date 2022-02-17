module.exports.signUpErrors = err => {
  let errors = { pseudo: '', email: '', password: '' }

  if (err.message.includes('pseudo'))
    errors.pseudo = 'Username is invalid or already taken'

  if (err.message.includes('email')) errors.email = 'Email is incorrect'

  if (err.message.includes('password'))
    errors.password = 'Password must be longer than 6 characters'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
    errors.pseudo = 'Username is already taken'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Email address has already been registered'

  return errors
}

module.exports.signInErrors = err => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'Invalid email'

  if (err.message.includes('password'))
    errors.password = "Password doesn't match"

  return errors
}

module.exports.uploadErrors = err => {
  let errors = { format: '', maxSize: '' }

  if (err.message.includes('invalid file')) errors.format = 'Invalid format'

  if (err.message.includes('max size')) errors.maxSize = 'File exceeds 500kb'

  return errors
}
