import React from 'react'
import MovieList from '../MovieList/MovieList'
import FetchingMovies from '../../services/FetchingMovies'
export default class App extends React.Component {
  fetchedMovies = new FetchingMovies()

  state = {
    moviesData: [],
  }
  componentDidMount() {
    this.gettingMovieDatas()
  }
  gettingMovieDatas = () => {
    this.fetchedMovies.getMoviesData('Мстители').then((result) => {
      this.setState({
        moviesData: result,
      })
    })
  }
  render() {
    return <MovieList moviesData={this.state.moviesData} />
  }
}
