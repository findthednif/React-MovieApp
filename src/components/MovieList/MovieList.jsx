import React from 'react'
import { Pagination, Spin, List } from 'antd'

import { ErrorMessage } from '../Messages/Messages'
import Movie from '../movie/Movie'
import MovieDB from '../../services/MovieDB'
import './MovieList.css'
export default class MovieList extends React.Component {
  movieDB = new MovieDB()
  state = {
    totalPages: null,
    currentPage: 1,
    moviesData: [],
    loading: false,
    genre: 'Action',
    error: false,
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query || prevProps.ratedOnly !== this.props.ratedOnly) {
      this.setState({
        loading: true,
      })
      const { query, ratedOnly, guestSessionId } = this.props
      const { currentPage } = this.state
      if (ratedOnly) {
        this.getRatedMovies(guestSessionId)
      } else {
        this.gettingMoviesData(query, currentPage)
      }
    }
  }
  gettingMoviesData = (query, page) => {
    this.movieDB
      .getMoviesData(query, page)
      .then((moviesData) => {
        this.setState({
          moviesData: moviesData.results,
          totalPages: moviesData.total_pages,
          loading: false,
        })
      })
      .catch((error) => {
        console.error(error)
        this.gettingMoviesError()
      })
  }
  getRatedMovies = (id) => {
    this.movieDB.getRatedMovies(id).then((ratedMovies) => {
      this.setState({
        moviesData: ratedMovies.results,
        totalPages: ratedMovies.total_pages,
        loading: false,
      })
    })
  }
  gettingMoviesError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  pageChange = (page) => {
    const { query, ratedOnly, guestSessionId } = this.props
    this.setState({
      currentPage: page,
      loading: true,
    })
    if (ratedOnly) {
      this.getRatedMovies(guestSessionId)
    } else {
      this.gettingMoviesData(query, page)
    }
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
  readyMoviesList = (moviesData) => {
    const readyMovies = moviesData.map((movie) => {
      let { overview } = movie
      if (overview.length >= 200) {
        overview = this.descriptionSlice(overview)
      }
      return (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.original_title}
          date={movie.release_date}
          description={overview}
          ImgUrl={movie.poster_path}
          genresIds={movie.genre_ids}
          rating={movie.vote_average}
          movieCreateTime={this.movieCreateTime}
          guestSessionId={this.props.guestSessionId}
        />
      )
    })
    return (
      <List
        className="moviesList"
        split={false}
        size="small"
        grid={{}}
        locale={{ emptyText: 'No movies' }}
        dataSource={readyMovies}
        renderItem={(item) => {
          return <List.Item>{item}</List.Item>
        }}
      />
    )
  }
  render() {
    const { moviesData, totalPages, loading, error } = this.state
    return (
      <>
        {error && ErrorMessage()}
        {loading ? spinner() : this.readyMoviesList(moviesData)}
        {
          <Pagination
            responsive
            hideOnSinglePage={true}
            className="moviesList__pagination"
            showSizeChanger={false}
            showQuickJumper={true}
            defaultCurrent={1}
            total={totalPages * 10}
            onChange={this.pageChange}
          />
        }
      </>
    )
  }
}
const spinner = () => {
  return <Spin className="loadingSpinner" size="large" />
}
