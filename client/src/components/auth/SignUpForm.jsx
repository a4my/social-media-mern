import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SignInForm'

export default function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    const terms = document.getElementById('terms')
    const usernameError = document.querySelector('.pseudo.error')
    // const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const confirmPasswordError = document.querySelector(
      '.password-confirm.error'
    )
    const termsError = document.querySelector('.terms.error')

    confirmPasswordError.innerHTML = ''
    termsError.innerHTML = ''

    if (password !== confirmPassword || !terms.checked) {
      if (password !== confirmPassword)
        confirmPasswordError.innerHTML = 'Passwords do not match!'

      if (!terms.checked)
        termsError.innerHTML = 'Please accept the terms and conditions.'
    } else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          username,
          email,
          password
        }
      })
        .then(res => {
          if (res.data.errors) {
            usernameError.innerHTML = res.data.errors.username
            email.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          } else {
            setFormSubmit(true)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">You are now registered, please login.</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="username">Username</label>
          <br />
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={e => setUsername(e.target.username)}
            value={username}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.email)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.password)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={e => setConfirmPassword(e.target.confirmPassword)}
            value={confirmPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I agree with the{' '}
            <a href="/" target="_blank" rel="noopener noreferrer">
              terms and conditions
            </a>
            .
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Register" />
        </form>
      )}
    </>
  )
}
