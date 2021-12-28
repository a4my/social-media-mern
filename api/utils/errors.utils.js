module.exports.signUpErrors = err => {
  let errors = { pseudo: '', email: '', password: '' }

  if (err.message.includes('pseudo'))
    errors.pseudo = 'Username is incorrect or already taken'

  if (err.message.includes('email')) errors.email = 'Email address is incorrect'

  if (err.message.includes('password'))
    errors.password = 'Password must be at least 6 characters'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
    errors.pseudo = 'This username has already been taken'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'This email address has already been used'

  return errors
}

module.exports.signInErrors = err => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'Email address is incorrect'

  if (err.message.includes('password'))
    errors.password = 'Password is incorrect'

  return errors
}

module.exports.uploadErrors = err => {
  let errors = { format: '', maxSize: '', noFile: '' }

  if (err.message.includes('invalid file')) errors.format = 'Wrong format!'

  if (err.message.includes('max size')) errors.maxSize = 'File exceeds 500kb'

  if (err.message.includes('no file'))
    errors.noFile = 'No files were selected or uploaded'

  return errors
}
