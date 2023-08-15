import React from 'react'
import { format } from 'date-fns'
import { Typography, Space, Image } from 'antd'

import './Movie.css'
import noPosterImage from './NoPosterImg.png'
const { Title, Text } = Typography
export default class Movie extends React.Component {
  movieCreateTime = (release) => {
    if (release) {
      const date = new Date(release)
      return format(date, 'MMMM dd, yyyy')
    }
    return 'NO DATA'
  }
  render() {
    const { title, titleLevel, date, description, ImgUrl, genre } = this.props
    return (
      <Space className="movie" align="start">
        <Image
          className="movie__image"
          src={'https://image.tmdb.org/t/p/w500' + ImgUrl}
          fallback={noPosterImage}
          width={200}
          height={280}
        />
        <div className="movie__description">
          <Title className="description__title" level={titleLevel}>
            {title}
          </Title>
          <Text className="description__date" type="secondary">
            {this.movieCreateTime(date)}
          </Text>
          <Text className="description__genre" code>
            {genre}
          </Text>
          <Text className="description__text">{description}</Text>
        </div>
      </Space>
    )
  }
}
