export default class FetchingMovies {
  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzFmMzFmODNkMjc1MzQ1MGRjODc0MzYxNjYwZjZkNiIsInN1YiI6IjY0Y2Y3YmRjODUwOTBmMDE0NDViOTU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lOy1BNMt8gvQTnCSDZWybXCJcwI5P5KaX_NJHmwxcW0',
    },
  }
  url = 'https://api.themoviedb.org/3'
  apiKey = 'api_key=d71f31f83d2753450dc874361660f6d6'
  getMoviesData = async (query, page) => {
    let result = await fetch(
      `${this.url}/search/movie?${this.apiKey}&query=${query}&include_adult=false&language=en-US&page=${page}`
    )
    if (!result.ok) {
      throw new Error(`getMoviesData failed, recieved ${result.status}`)
    }
    result = await result.json()
    console.log(result)
    return result
  }
  createGuestSession = async () => {
    let result = await fetch(`${this.url}/authentication/guest_session/new?${this.apiKey}`)
    if (!result.ok) {
      throw new Error(`createGuestSession failed, recieved ${result.status}`)
    }
    result = await result.json()
    return result
  }
  addRating = async (movieId, sessionId, rating) => {
    let result = await fetch(`${this.url}/movie/${movieId}/rating?${this.apiKey}&guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    })
    if (!result.ok) {
      throw new Error(`addRating failed, recieved ${result.status}`)
    }
    result = await result.json()
    return result
  }
  getRatedMovies = async (id) => {
    let result = await fetch(
      `${this.url}/guest_session/${id}/rated/movies?${this.apiKey}&language=en-US&page=1&sort_by=created_at.asc`
    )
    if (!result.ok) {
      throw new Error(`getRatedMovies failes, recieved ${result.status}`)
    }
    result = await result.json()
    return result
  }
  getGenres = async () => {
    let result = await fetch(`${this.url}/genre/movie/list?language=en&${this.apiKey}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
    if (!result.ok) {
      throw new Error(`getGenres failes, recieved ${result.status}`)
    }
    result = await result.json()
    console.log(result.genres)
    return result.genres
  }
}
