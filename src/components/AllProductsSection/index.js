import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import Rating from '../Rating'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    categoryId: '',
    rating: '',
    userInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, userInput, categoryId, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/prducts?sort_by=${activeOptionId}&title_search=${userInput}&category=${categoryId}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View

    const lengthOfList = productsList.length
    if (lengthOfList === 0) {
      return (
        <div className="no-products-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
          />
          <h1>No Products Found</h1>
          <p>We could not find products. Try other filters</p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickCategoryItem = id => {
    this.setState(
      {
        categoryId: id,
      },
      this.getProducts,
    )
  }

  onClickRating = rid => {
    console.log('rating item with id is clicked', rid)
    this.setState(
      {
        rating: rid,
      },
      this.getProducts,
    )
  }

  onChangeSearchInput = event => {
    console.log(event.target.value)
    console.log('key = ', event)
    if (event.key === 'Enter') {
      this.setState(
        {
          userInput: event.target.value,
        },
        this.getProducts,
      )
    }
  }

  onClickClearBtn = () => {
    this.setState(
      {
        categoryId: '',
        userInput: '',
        rating: '',
      },
      this.getProducts,
    )
  }

  // TODO: Add failure view

  render() {
    const {isLoading, categoryId, rating} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <div className="filter-container">
          <div className="input-container">
            <input
              type="search"
              placeholder="Search"
              className="input-element"
              onKeyDown={this.onChangeSearchInput}
            />
            <BsSearch />
          </div>
          <ul className="category-container">
            <h1 className="category-heading">Category</h1>
            {categoryOptions.map(each => (
              <FiltersGroup
                category={each}
                key={each.id}
                isClicked={categoryId === each.categoryId}
                onClickCategoryItem={this.onClickCategoryItem}
              />
            ))}
          </ul>

          <ul className="ratings-container">
            <p>Rating</p>
            {ratingsList.map(each => (
              <Rating
                rating={each}
                key={each.ratingId}
                isChoosen={rating === each.ratingId}
                onClickRating={this.onClickRating}
              />
            ))}
          </ul>
          <button
            type="button"
            className="clear-btn"
            onClick={this.onClickClearBtn}
          >
            Clear Filters
          </button>
        </div>

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
