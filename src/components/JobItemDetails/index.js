import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import SpecificJobDetails from '../SpecificJobDetails'
import Header from '../Header'
import './index.css'

const constants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    singleSelectedJobList: [],
    skillsList: [],
    lifeList: {},
    similarJobsList: [],
    apistatus: '',
  }

  componentDidMount() {
    this.getSingleSelectJob()
  }

  onSuccessfullyGettingData = data => {
    const updatedData = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      skills: data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      similarJobs: data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      })),
    }

    const skillsUpdatedData = data.job_details.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))

    const lifeUpdatedData = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }

    const similarJobsUpdatedData = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      singleSelectedJobList: updatedData,
      skillsList: skillsUpdatedData,
      lifeList: lifeUpdatedData,
      similarJobsList: similarJobsUpdatedData,
      apiStatus: constants.success,
    })
  }

  getSingleSelectJob = async () => {
    this.setState({apiStatus: constants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessfullyGettingData(data)
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  renderOptedJobDetails = () => {
    const {
      singleSelectedJobList,
      skillsList,
      lifeList,
      similarJobsList,
    } = this.state
    return (
      <>
        <SpecificJobDetails
          each={singleSelectedJobList}
          skillsList={skillsList}
          lifeList={lifeList}
          similarJobsList={similarJobsList}
        />
      </>
    )
  }

  onRetry = () => {
    this.getSingleSelectJob()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.onRetry} className="failure-view-retry-button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderOptedJobDetails()
      case constants.failure:
        return this.renderFailureView()
      case constants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="selected-job-details-container">
          {this.renderSwitchCases()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
