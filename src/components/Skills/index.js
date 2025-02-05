import './index.css'

const Skills = props => {
  const {reqSkill} = props
  const {imageUrl, name} = reqSkill
  return (
    <li className="each-skill-list">
      <img className="skill-image" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
