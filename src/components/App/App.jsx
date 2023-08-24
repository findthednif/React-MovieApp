import React from 'react'
import { Menu } from 'antd'

import { LostNetworkMessage } from '../Messages/Messages'
import MovieList from '../MovieList/MovieList'
import SearchPanel from '../SearchPanel/SearchPanel'
import MovieDB from '../../services/MovieDB.jsx'
import './App.css'
import { Provider } from '../Context/Context.jsx'
export default class App extends React.Component {
  movieDB = new MovieDB()
  state = {
    query: '',
    isOnline: navigator.isOnline,
    ratedOnly: false,
    guestSessionId: null,
  }
  navigationMenu = [
    {
      label: 'Search',
      key: 'search',
    },
    {
      label: 'Rated',
      key: 'Rated',
    },
  ]
  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOnline)
    this.movieDB.createGuestSession().then((result) => {
      this.setState({
        guestSessionId: result.guest_session_id,
      })
    })
    this.movieDB.getGenres().then((genres) => {
      this.setState({
        genres: genres,
      })
    })
  }
  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOnline)
  }
  rateChange = () => {
    this.setState(({ ratedOnly }) => {
      return {
        ratedOnly: !ratedOnly,
      }
    })
  }
  movieTyped = (value) => {
    this.setState({
      query: value,
    })
  }
  handleOnline = () => {
    this.setState(({ isOnline }) => {
      return {
        isOnline: !isOnline,
      }
    })
  }
  render() {
    const { query, ratedOnly, guestSessionId, genres } = this.state
    return (
      <Provider value={genres}>
        {this.state.isOnline && LostNetworkMessage()}
        <Menu
          className="navigationMenu"
          mode="horizontal"
          items={this.navigationMenu}
          onSelect={this.rateChange}
          defaultSelectedKeys={['search']}
        />
        {!ratedOnly && <SearchPanel movieTyped={this.movieTyped} />}
        <MovieList query={query} ratedOnly={ratedOnly} guestSessionId={guestSessionId} />
      </Provider>
    )
  }
}
