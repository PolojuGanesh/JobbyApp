import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const constants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {userProfileList: {}, apiStatus: ''}

  componentDidMount() {
    this.getProfileData()
  }

  renderUserProfile = data => {
    const updatedUserData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({
      userProfileList: updatedUserData,
      apiStatus: constants.success,
    })
  }

  getProfileData = async () => {
    this.setState({apiStatus: constants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.renderUserProfile(data)
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getProfileData()
  }

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        onClick={this.onRetry}
        className="profile-failure-view-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {userProfileList} = this.state
    const {name, profileImageUrl, shortBio} = userProfileList
    return (
      <div className="user-profile-container">
        <img className="profile-image" alt="profile" src={profileImageUrl} />
        <h1 className="user-name">{name}</h1>
        <p className="user-role">{shortBio}</p>
      </div>
    )
  }

  renderSwitchCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderSuccessView()
      case constants.failure:
        return this.renderFailureView()
      case constants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderSwitchCases()
  }
}

export default UserProfile
