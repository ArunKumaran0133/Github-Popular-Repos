import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstance = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repositoryItems: [],
    apiStatus: apiStatusConstance.initial,
  }

  // Api call placed here
  componentDidMount() {
    this.getPopularRepo()
  }

  // Fetching data here
  getPopularRepo = async () => {
    const {activeTabId} = this.state

    this.setState({apiStatus: apiStatusConstance.inProgress})

    const option = {
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(url, option)

    console.log(response.ok)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        repositoryItems: updatedData,
        apiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstance.failure})
    }
  }

  // getting active tab id here from LanguageFilterItem Component...
  getActiveTabId = id => {
    this.setState({activeTabId: id}, this.getPopularRepo)
  }

  // Tabs iterating here...
  filterItemTabs = () => {
    const {activeTabId} = this.state
    return (
      <ul className="list-container">
        {languageFiltersData.map(eachTabs => (
          <LanguageFilterItem
            key={eachTabs.id}
            eachTabs={eachTabs}
            getActiveTabId={this.getActiveTabId}
            activeTabId={eachTabs.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  // Repository iterating here...
  iterateRepositoryItem = () => {
    const {repositoryItems} = this.state
    console.log(repositoryItems)
    return (
      <ul className="repo-list-container">
        {repositoryItems.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  repositoryLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" />
    </div>
  )

  renderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstance.success:
        return this.iterateRepositoryItem()
      case apiStatusConstance.failure:
        return this.failureView()
      case apiStatusConstance.inProgress:
        return this.repositoryLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-git-bg-container">
        <h1 className="popular-heading">Popular</h1>
        {this.filterItemTabs()}
        {this.renderRepository()}
      </div>
    )
  }
}
export default GithubPopularRepos
