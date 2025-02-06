import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import EachJobCard from '../EachJobCard'
import UserProfile from '../UserProfile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {locationId: 'HYDERABAD', label: 'Hyderabad'},
  {locationId: 'BANGALORE', label: 'Bangalore'},
  {locationId: 'CHENNAI', label: 'Chennai'},
  {locationId: 'DELHI', label: 'Delhi'},
  {locationId: 'MUMBAI', label: 'Mumbai'},
]

const constants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    selectedJobType: [],
    selectedSalaryType: [],
    selectedLocation: [],
    userSearchInput: '',
    apiStatus: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getSearchInput = event => {
    this.setState({userSearchInput: event.target.value})
  }

  getJobs = async () => {
    this.setState({apiStatus: constants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {
      selectedJobType,
      selectedSalaryType,
      selectedLocation,
      userSearchInput,
    } = this.state

    const employmentTypes = selectedJobType.join(',')
    const salaryRanges = selectedSalaryType.join(',')

    let url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRanges}&search=${userSearchInput}`

    // Append each selected location as a separate query parameter
    selectedLocation.forEach(location => {
      url += `&location=${location}`
    })

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobsList: updatedData, apiStatus: constants.success})
      return // Early return to avoid unnecessary else
    }
    this.setState({apiStatus: constants.failure})
  }

  changeEmploymentType = dataReceived => {
    this.setState(prevState => {
      const {selectedJobType} = prevState
      const index = selectedJobType.indexOf(dataReceived)

      if (index === -1) {
        return {selectedJobType: [...selectedJobType, dataReceived]}
      }
      return {
        selectedJobType: selectedJobType.filter(type => type !== dataReceived),
      }
    }, this.getJobs)
  }

  changeSalaryType = dataReceived => {
    this.setState(prevState => {
      const {selectedSalaryType} = prevState
      const index = selectedSalaryType.indexOf(dataReceived)

      if (index === -1) {
        return {selectedSalaryType: [...selectedSalaryType, dataReceived]}
      }
      return {
        selectedSalaryType: selectedSalaryType.filter(
          type => type !== dataReceived,
        ),
      }
    }, this.getJobs)
  }

  changeLocationType = dataReceived => {
    this.setState(prevState => {
      const {selectedLocation} = prevState
      const index = selectedLocation.indexOf(dataReceived)

      if (index === -1) {
        return {selectedLocation: [...selectedLocation, dataReceived]}
      }
      return {
        selectedLocation: selectedLocation.filter(
          type => type !== dataReceived,
        ),
      }
    }, this.getJobs)
  }

  renderEmploymentType = () => {
    const {selectedJobType} = this.state

    return employmentTypesList.map(eachType => {
      const onSelectingEmploymentType = () => {
        this.changeEmploymentType(eachType.employmentTypeId)
      }

      const isChecked = selectedJobType.includes(eachType.employmentTypeId)

      return (
        <li
          key={eachType.employmentTypeId}
          className="each-employment-type-list"
        >
          <input
            id={eachType.employmentTypeId}
            className="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={onSelectingEmploymentType}
          />
          <label
            htmlFor={eachType.employmentTypeId}
            className="employment-type-label"
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  renderSalaryRangeType = () => {
    const {selectedSalaryType} = this.state

    return salaryRangesList.map(eachType => {
      const onSelectingSalaryType = () => {
        this.changeSalaryType(eachType.salaryRangeId)
      }

      const isChecked = selectedSalaryType.includes(eachType.salaryRangeId)

      return (
        <li
          key={eachType.salaryRangeId}
          className="each-salary-range-type-list"
        >
          <input
            id={eachType.salaryRangeId}
            className="radio"
            type="radio"
            checked={isChecked}
            onChange={onSelectingSalaryType}
          />
          <label
            htmlFor={eachType.salaryRangeId}
            className="salary-range-type-label"
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  renderLocationType = () => {
    const {selectedLocation} = this.state

    return locationsList.map(eachType => {
      const onSelectingLocationType = () => {
        this.changeLocationType(eachType.locationId)
      }

      const isChecked = selectedLocation.includes(eachType.locationId)

      return (
        <li key={eachType.locationId} className="each-employment-type-list">
          <input
            id={eachType.locationId}
            className="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={onSelectingLocationType}
          />
          <label
            htmlFor={eachType.locationId}
            className="employment-type-label"
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobs()
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
      <button
        type="button"
        onClick={this.onRetry}
        className="failure-view-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderNoFiltersMatch = () => (
    <div className="no-filter-match-container">
      <img
        className="no-filter-match-image"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="no-filter-match-heading">No Jobs Found</h1>
      <p className="no-filter-match-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderSwitchCases = () => {
    const {apiStatus, jobsList} = this.state
    switch (apiStatus) {
      case constants.success:
        return jobsList.length === 0
          ? this.renderNoFiltersMatch()
          : this.renderAllJobs()
      case constants.failure:
        return this.renderFailureView()
      case constants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderAllJobs = () => {
    const {jobsList} = this.state
    return (
      <div className="only-all-jobs-container">
        <ul className="all-jobs-ul-list">
          {jobsList.map(each => (
            <EachJobCard each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSearchInput = () => {
    const {userSearchInput} = this.state
    return (
      <div className="search-input-and-icon">
        <input
          onChange={this.getSearchInput}
          value={userSearchInput}
          type="search"
          className="search-input-element"
          placeholder="Search"
          onKeyDown={this.onSearchByEnter}
        />
        <button
          type="button"
          aria-label="Search"
          data-testid="searchButton"
          onClick={this.onGetSearchedList}
          className="search-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onGetSearchedList = () => {
    this.getJobs()
  }

  onSearchByEnter = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  render() {
    return (
      <>
        <div className="all-jobs-main-container">
          <div className="user-profile-and-filter-container">
            <UserProfile />
            <hr className="horizontal-line" />
            <div className="employment-type-main-container">
              <h1 className="employment-type-heading">Type of Employment</h1>
              <ul className="employment-type-ul-container">
                {this.renderEmploymentType()}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div className="salary-range-type-main-container">
              <h1 className="salary-range-type-heading">Salary Range</h1>
              <ul className="salary-range-type-ul-container">
                {this.renderSalaryRangeType()}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div className="employment-type-main-container">
              <h1 className="employment-type-heading">Location</h1>
              <ul className="employment-type-ul-container">
                {this.renderLocationType()}
              </ul>
            </div>
          </div>
          <div className="jobs-display-container">
            {this.renderSearchInput()}
            {this.renderSwitchCases()}
          </div>
        </div>
        <div className="jobs-container-mobile-view">
          {this.renderSearchInput()}
          <UserProfile />
          <hr />
          <div className="employment-type-main-container">
            <h1 className="employment-type-heading">Type of Employment</h1>
            <ul className="employment-type-ul-container">
              {this.renderEmploymentType()}
            </ul>
          </div>
          <hr />
          <div className="salary-range-type-main-container">
            <h1 className="salary-range-type-heading">Salary Range</h1>
            <ul className="salary-range-type-ul-container">
              {this.renderSalaryRangeType()}
            </ul>
          </div>
          <hr />
          <div className="employment-type-main-container">
            <h1 className="employment-type-heading">Location</h1>
            <ul className="employment-type-ul-container">
              {this.renderLocationType()}
            </ul>
          </div>
          {this.renderSwitchCases()}
        </div>
      </>
    )
  }
}

export default AllJobsSection
