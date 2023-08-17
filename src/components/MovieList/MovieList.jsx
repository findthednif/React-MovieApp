import React from "react";
import SearchPanel from "../SearchPanel/SearchPanel";
import { Pagination, Spin, Typography } from "antd";
import { format } from "date-fns";
import { ErrorMessage } from "../Messages/Messages";
import Movie from "../movie/Movie";
import FetchingMovies from "../../services/FetchingMovies";
import "./MovieList.css";
const { Title } = Typography;
export default class MovieList extends React.Component {
  state = {
    totalPages: null,
    currentPage: 1,
    moviesData: [],
    loading: false,
    genre: "Action",
    error: false,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        loading: true,
      });
      const { query } = this.props
      const { currentPage } = this.state;
      this.gettingMoviesData(query, currentPage);
    }
  }
  gettingMoviesData = (query, page) => {
    const movies = new FetchingMovies();
    movies
      .getMoviesData(query, page)
      .then((moviesData) => {
        this.setState({
          moviesData: moviesData.results,
          totalPages: moviesData.total_pages,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.gettingMoviesError();
      });
  };
  gettingMoviesError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  pageChange = (page) => {
    const { query } = this.props;
    this.setState({
      currentPage: page,
      loading: true,
    });
    this.gettingMoviesData(query, page);
  };
  readyMovies = (moviesData) => {
    return moviesData.map((movie) => {
      let { overview, original_title } = movie;
      if (overview.length >= 200) {
        overview = this.descriptionSlice(overview);
      }
      const titleLevel = original_title.length > 25 ? 5 : 3;
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
      );
    });
  };
  movieCreateTime = (release) => {
    if (release) {
      const date = new Date(release);
      return format(date, "MMMM dd, yyyy");
    }
    return "NO DATA";
  };
  descriptionSlice = (description) => {
    let truncatedOverview = description.slice(0, 150);
    let lastSpaceIndex = truncatedOverview.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      description = truncatedOverview.slice(0, lastSpaceIndex) + "...";
    } else {
      description = truncatedOverview + "...";
    }
    return description;
  };
  render() {
    const { totalPages, moviesData, loading, error } = this.state;
    return (
      <>
        {error && ErrorMessage()}
        {loading ? spinner() : this.readyMovies(moviesData)}
        {moviesData.length > 0 && totalPages > 1 ? (
          <Pagination
            showSizeChanger = {false}
            showQuickJumper = {true}
            defaultCurrent={1}
            total={totalPages * 10}
            onChange={this.pageChange}
          />
        ) : (
          !loading &&
          !error &&
          moviesData.length === 0 && (
            <Title level={3} italic={true}>
              No movies available
            </Title>
          )
        )}
      </>
    );
  }
}
const spinner = () => {
  return <Spin className="loadingSpinner" size="large" />;
};
