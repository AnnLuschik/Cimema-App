export interface IMovieItem {
  id?: number
  title: string // Movie title
  tagline?: string
  vote_average?: number
  vote_count?: number
  release_date: string
  poster_path: string // Poster Image
  overview?: string // Short description of movie
  budget?: number
  revenue?: number
  runtime?: number // Movie duration
  genres: [string]
}

export interface MoviesList {
  data: IMovieItem[]
  total: number
  offset: number
  limit: number
}

export interface MovieSearchState {
  searchParams: {searchValue: string, searchType: string}
  responseData: MoviesList | null
  errorMessage: string | null
  loading: boolean
  loadingMore: boolean
}
