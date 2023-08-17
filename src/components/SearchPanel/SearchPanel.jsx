import React from "react";
import { Input } from "antd";
import { debounce } from "lodash";
export default class SearchPanel extends React.Component {
  state = {
    value: "",
  };
  debouncedMovieTyped = debounce(this.props.movieTyped, 1000);
  componentDidUpdate(prevProps, prevState){
    if (prevState.value !== this.state.value) {
      this.debouncedMovieTyped(this.state.value);
    }
  };
  saveValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <Input
        size="large"
        placeholder="Type to search..."
        value={this.state.value}
        onChange={this.saveValue}
      />
    );
  }
}
