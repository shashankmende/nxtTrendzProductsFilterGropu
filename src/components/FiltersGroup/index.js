import './index.css'

const FiltersGroup = props => {
  const {category, isClicked, onClickCategoryItem} = props
  const {categoryId, name} = category
  const activeName = isClicked ? 'activeClassName' : ''

  const onClickCategory = () => {
    onClickCategoryItem(categoryId)
  }

  return (
    <li className="list-item" onClick={onClickCategory}>
      <p className={`category-button ${activeName}`}>{name}</p>
    </li>
  )
}

export default FiltersGroup
