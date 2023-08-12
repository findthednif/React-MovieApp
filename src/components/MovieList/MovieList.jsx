import React from 'react'
import Movie from '../movie/Movie.jsx'
import './MovieList.css'
export default class MovieList extends React.Component {
  movies = () => {
    const { moviesData } = this.props
    return moviesData.map((movie) => {
      let { overview, original_title } = movie
      if (overview.length >= 200) {
        overview = this.descriptionSlice(overview)
      }
      const titleLevel = original_title.length > 25 ? 5 : 3
      return (
        <Movie
          key={movie.id}
          title={movie.original_title}
          titleLevel={titleLevel}
          date={movie.release_date}
          description={overview}
          imgUrl={movie.poster_path}
        />
      )
    })
  }
  descriptionSlice = (description) => {
    let truncatedOverview = description.slice(0, 150)
    let lastSpaceIndex = truncatedOverview.lastIndexOf(' ')
    if (lastSpaceIndex !== -1) {
      description = truncatedOverview.slice(0, lastSpaceIndex) + '...'
    } else {
      description = truncatedOverview + '...'
    }
    return description
  }
  render() {
    return <ul className="movies">{this.movies()}</ul>
  }
}
