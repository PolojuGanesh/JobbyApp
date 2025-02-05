import './index.css'

const SimilarJobs = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob
  return (
    <li className="similar-job-list-item">
      <div className="similar-companylogo-title-rating-container">
        <div className="similar-companylogo-container">
          <img
            className="similar-company-logo"
            alt="similar job company logo"
            src={companyLogoUrl}
          />
        </div>
        <div className="similar-title-rating-container">
          <h3 className="similar-job-title">{title}</h3>
          <div className="similar-star-rating-container">
            <p className="similar-company-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-location-employmenttype-salary-container">
        <div className="similar-location-employmenttype-container">
          <div className="similar-location-icon-container">
            <p className="similar-job-location">{location}</p>
          </div>
          <div className="similar-employmenttype-icon-container">
            <p className="similar-employment-type">{employmentType}</p>
          </div>
        </div>
      </div>
      <div className="similar-description-container">
        <h3 className="similar-job-description-heading">Description</h3>
        <p className="similar-job-description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
