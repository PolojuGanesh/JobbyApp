import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="header-website-logo">
        <img
          className="navbar-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="navbar-links-ul-container">
        <Link to="/" className="link-to-list-element">
          <li className="navbar-home">Home</li>
        </Link>
        <Link to="/jobs" className="link-to-list-element">
          <li className="navbar-jobs">Jobs</li>
        </Link>
      </ul>
      <button onClick={onClickLogout} className="logout-button" type="button">
        Logout
      </button>
      <div className="mobile-view-container">
        <ul className="mobile-ul-nav-items-container">
          <li className="each-mobile-nav-list">
            <Link to="/">
              <button aria-label="Home" className="each-nav-list-button">
                <AiFillHome className="each-nav-icon" />
              </button>
            </Link>
          </li>
          <li className="each-mobile-nav-list">
            <Link to="/jobs">
              <button aria-label="Jobs" className="each-nav-list-button">
                <BsBriefcaseFill className="each-nav-icon" />
              </button>
            </Link>
          </li>
          <li className="each-mobile-nav-list">
            <button
              onClick={onClickLogout}
              aria-label="Logout"
              className="each-nav-list-button"
            >
              <FiLogOut className="each-nav-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
