export type SearchByType = 'title' | 'genres';
export type SortByType = 'title' | 'release_date' | 'vote_average';
export type SortOrderType = 'desc' | 'asc';

export interface ISearchParams {
  searchValue: string
  searchBy: SearchByType
  sortBy: SortByType
  sortOrder: SortOrderType
}

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

export interface IMoviesList {
  data: IMovieItem[]
  total: number
  offset: number
  limit: number
}

export interface MovieSearchState {
  searchParams: ISearchParams
  responseData: IMoviesList | null
  singleMovieData: IMovieItem | null
  errorMessage: string | null
  loading: boolean
  loadingMore: boolean
  loadingModal: boolean
}
