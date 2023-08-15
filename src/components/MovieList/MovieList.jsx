import React from 'react'
import { Spin } from 'antd'
import { format } from 'date-fns'

import { ErrorMessage } from '../Messages/Messages'
import Movie from '../movie/Movie'
import FetchingMovies from '../../services/FetchingMovies'
import './MovieList.css'
export default class MovieList extends React.Component {
  state = {
    loading: true,
    genre: 'Action',
    error: false,
  }
  componentDidMount() {
    try {
      this.gettingMoviesData()
    } catch (e) {
      console.log(e)
    }
  }
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  gettingMoviesData = () => {
    const movies = new FetchingMovies()
    //setTimeout установлен, чтобы явно было видно, что индикатор загрузки присутствует
    setTimeout(() => {
      movies
        .getMoviesData('Avengers')
        .then((moviesData) => {
          this.setState({
            moviesData,
            loading: false,
          })
        })
        .catch(error =>{
          console.log(error);
          this.onError()})
    }, 2000)
  }
  loadingMovies = () => {
    return <Spin className="loadingSpinner" size="large" />
  }
  readyMoviesData = () => {
    const { moviesData } = this.state
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
          ImgUrl={movie.poster_path}
          genre={this.state.genre}
          movieCreateTime={this.movieCreateTime}
        />
      )
    })
  }
  movieCreateTime = (release) => {
    if (release) {
      const date = new Date(release)
      return format(date, 'MMMM dd, yyyy')
    }
    return 'NO DATA'
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
    const { loading, error } = this.state
    if (error) {
      return ErrorMessage()
    }
    return loading ? this.loadingMovies() : this.readyMoviesData()
  }
}
