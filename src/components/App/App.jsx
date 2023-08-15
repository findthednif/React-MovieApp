import React from "react";
import { LostNetworkMessage } from "../Messages/Messages";
import MovieList from "../MovieList/MovieList";
export default class App extends React.Component {
  state = {
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
  handleOnline = () => {
    this.setState(({ isOnline }) => {
      return {
        isOnline: !isOnline,
      };
    });
  };
  render() {
    return (
      <>
        {this.state.isOnline && LostNetworkMessage()}
        <MovieList />
      </>
    );
  }
}
