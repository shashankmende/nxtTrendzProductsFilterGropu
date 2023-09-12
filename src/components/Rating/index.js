import './index.css'

const Rating = props => {
  const {rating, onClickRating, isChoosen} = props
  const {ratingId, imageUrl} = rating

  const activecls = isChoosen ? 'activeClsName' : ''

  const onClickRatingItem = () => {
    console.log('Is clicked', isChoosen)
    onClickRating(ratingId)
  }

  return (
    <li className={`rating-list-item ${activecls}`} onClick={onClickRatingItem}>
      <button type="button" className="ratings-button">
        <img
          src={imageUrl}
          alt={`rating ${ratingId}`}
          className="rating-image"
        />
        <p> & up</p>
      </button>
    </li>
  )
}

export default Rating
