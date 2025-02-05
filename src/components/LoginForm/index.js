import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isTrue: false}

  userEnteredUserName = event => {
    this.setState({username: event.target.value})
  }

  userEnteredPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onUnsuccessfulLogin = errorMsg => {
    this.setState({errorMsg, isTrue: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onUnsuccessfulLogin(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="username" className="username-label">
          USERNAME
        </label>
        <br />
        <input
          value={username}
          onChange={this.userEnteredUserName}
          placeholder="Username"
          id="username"
          className="username-input"
          type="text"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label htmlFor="password" className="password-label">
          PASSWORD
        </label>
        <br />
        <input
          value={password}
          onChange={this.userEnteredPassword}
          placeholder="Password"
          id="password"
          className="password-input"
          type="password"
        />
      </div>
    )
  }

  render() {
    const {isTrue, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <div className="logo-container">
            <img
              className="app-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          {this.renderUserName()}
          {this.renderPassword()}
          <div className="login-button-container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          {isTrue && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
