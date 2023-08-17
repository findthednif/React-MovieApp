import React from "react";
import { LostNetworkMessage } from "../Messages/Messages";
import MovieList from "../MovieList/MovieList";
import SearchPanel from "../SearchPanel/SearchPanel"; 
import './App.css'
export default class App extends React.Component {
  state = {
    query: null,
    isOnline: navigator.isOnline,
  };
  componentDidMount() {
    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOnline);
  }
  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOnline)
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
      };
    });
  };
  render() {
    const {query} = this.state
    return (
      <>
        {this.state.isOnline && LostNetworkMessage()}
        <SearchPanel movieTyped = {this.movieTyped}/>
        <div className="movieList">
        <MovieList query={query}/>
        </div>
      </>
    );
  }
}
