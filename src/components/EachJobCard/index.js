import {Link} from 'react-router-dom'

import './index.css'

const EachJobCard = props => {
  const {each} = props

  const {
    companyLogoUrl,
    employmentType,
    title,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
    id,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="link-item-job">
      <li key={id} className="each-job-list-container">
        <div className="companylogo-title-rating-container">
          <div className="companylogo-container">
            <img
              className="company-logo"
              alt="company logo"
              src={companyLogoUrl}
            />
          </div>
          <div className="title-rating-container">
            <h3 className="job-title">{title}</h3>
            <div className="star-rating-container">
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employmenttype-salary-container">
          <div className="location-employmenttype-container">
            <div className="location-icon-container">
              <p className="job-location">{location}</p>
            </div>
            <div className="employmenttype-icon-container">
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <div className="salary-container">
            <p className="job-salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description-container">
          <h3 className="job-description-heading">Description</h3>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default EachJobCard
