import React from 'react'
import { format } from 'date-fns'
import { Typography, Space, Image, Rate } from 'antd'

import MovieDB from '../../services/MovieDB.jsx'
import './Movie.css'
import MovieRating from '../MovieRating/MovieRating.jsx'
import Genres from '../Genres/Genres.jsx'

import noPosterImage from './NoPosterImg.png'

const { Title, Text } = Typography
export default class Movie extends React.Component {
  movieDB = new MovieDB()
  state = {
    rate: 0,
  }
  componentDidMount() {
    const { id } = this.props
    const rateState = localStorage.getItem(`rateState${id}`)
    if (rateState) {
      this.setState({
        rate: JSON.parse(rateState),
      })
      localStorage.removeItem(`rateState${id}`)
    }
  }
  componentWillUnmount() {
    const { rate } = this.state
    const { id } = this.props
    if (rate !== 0) {
      localStorage.setItem(`rateState${id}`, JSON.stringify(rate))
    }
  }
  movieCreateTime = (release) => {
    if (release) {
      const date = new Date(release)
      return format(date, 'MMMM dd, yyyy')
    }
    return 'NO DATA'
  }
  addRating = (rating) => {
    const { id, guestSessionId } = this.props
    if (rating !== 0) {
      this.movieDB.addRating(id, guestSessionId, rating)
    } else {
      this.movieDB.deleteRating(id, guestSessionId)
    }
    this.setState({
      rate: rating,
    })
  }
  render() {
    const { title, date, description, ImgUrl, genresIds, rating } = this.props
    const { rate } = this.state
    return (
      <Space className="movie" align="start" size="middle">
        <Image
          className="movie__image"
          src={'https://image.tmdb.org/t/p/w500' + ImgUrl}
          fallback={noPosterImage}
          width={200}
          height={280}
        />
        <div className="movie__description">
          <div className="description__title">
            <Title className="title__name" level={5}>
              {title}
            </Title>
            <MovieRating rating={rating} />
          </div>
          <Text className="description__date" type="secondary">
            {this.movieCreateTime(date)}
          </Text>
          <div className="description__genre">
            <Genres genresIds={genresIds} />
          </div>
          <Text className="description__text">{description}</Text>
          <Rate className="description__rate" count={10} allowClear={true} onChange={this.addRating} value={rate} />
        </div>
      </Space>
    )
  }
}
