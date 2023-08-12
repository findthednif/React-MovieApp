export default class FetchingMovies {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzFmMzFmODNkMjc1MzQ1MGRjODc0MzYxNjYwZjZkNiIsInN1YiI6IjY0Y2Y3YmRjODUwOTBmMDE0NDViOTU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lOy1BNMt8gvQTnCSDZWybXCJcwI5P5KaX_NJHmwxcW0',
    },
  }
  getMoviesData = async (query) => {
    let result = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      this.options
    )
    if (!result.ok) {
      throw new Error(`Fetched failed, recieved ${result.status}`)
    }
    result = await result.json()
    console.log(result.results)
    return result.results
  }
}
