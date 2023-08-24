import React from 'react'
import './MovieRating.css'
export default class MovieRating extends React.Component {
  ratingColor = () => {
    const { rating } = this.props
    let className = 'green'
    if (rating >= 0 && rating < 3) {
      return (className = 'red')
    } else if (rating >= 3 && rating < 5) {
      return (className = 'orange')
    } else if (rating >= 5 && rating < 7) {
      return (className = 'yellow')
    } else return className
  }
  render() {
    const { rating } = this.props
    return <span className={`movieRating ${this.ratingColor()}`}>{rating.toFixed(1)}</span>
  }
}
