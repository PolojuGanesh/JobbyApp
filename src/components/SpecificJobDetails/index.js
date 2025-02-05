import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const SpecificJobDetails = props => {
  const {each, skillsList, lifeList, similarJobsList} = props
  return (
    <>
      <div className="specific-selected-job-container">
        <div className="specific-companylogo-title-rating-container">
          <div className="specific-companylogo-container">
            <img
              className="specific-company-logo"
              alt="job details company logo"
              src={each.companyLogoUrl}
            />
          </div>
          <div className="specific-title-rating-container">
            <h3 className="specific-job-title">{each.title}</h3>
            <div className="specific-star-rating-container">
              <p className="specific-company-rating">{each.rating}</p>
            </div>
          </div>
        </div>
        <div className="specific-location-employmenttype-salary-container">
          <div className="specific-location-employmenttype-container">
            <div className="specific-location-icon-container">
              <p className="specific-job-location">{each.location}</p>
            </div>
            <div className="specific-employmenttype-icon-container">
              <p className="specific-employment-type">{each.employmentType}</p>
            </div>
          </div>
          <div className="specific-salary-container">
            <p className="specific-job-salary">{each.packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="specific-description-container">
          <div className="description-and-website-url-container">
            <h3 className="specific-job-description-heading">Description</h3>
            <a
              href={each.companyWebsiteUrl}
              target="blank"
              className="wesite-url"
            >
              Visit
            </a>
          </div>
          <p className="specific-job-description">{each.jobDescription}</p>
        </div>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skill-ul-container">
          {skillsList.map(reqSkill => (
            <Skills reqSkill={reqSkill} key={reqSkill.name} />
          ))}
        </ul>
        <h1 className="specific-job-description-heading">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="life-at-company-description">{lifeList.description}</p>
          <img
            className="life-at-company-image"
            alt="life at company"
            src={lifeList.imageUrl}
          />
        </div>
      </div>
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs-ul-container">
        {similarJobsList.map(eachJob => (
          <SimilarJobs eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    </>
  )
}

export default SpecificJobDetails
