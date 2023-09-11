import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = eachRepo

  return (
    <li className="item-container">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="name">{name}</h1>
      <div className="text-avatar-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="avatar-logo"
        />
        <p className="item-text">{`${starsCount} Stars`}</p>
      </div>
      <div className="text-avatar-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="avatar-logo"
        />
        <p className="item-text">{`${forksCount} Forks`}</p>
      </div>
      <div className="text-avatar-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="avatar-logo"
        />
        <p className="item-text">{`${issuesCount} Open issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
