import './index.css'

const LanguageFilterItem = props => {
  const {eachTabs, getActiveTabId, activeTabId} = props
  const {language, id} = eachTabs

  const onGetTabId = () => {
    getActiveTabId(id)
  }

  const activeClass = activeTabId ? 'active-class' : ''

  return (
    <li>
      <button
        type="button"
        className={`language-button ${activeClass}`}
        onClick={onGetTabId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
