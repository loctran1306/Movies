export type homeMovieListType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: unknown[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type datesType = {
  maximum: string;
  minimum: string;
};
export type homeMovieType = {
  dates?: datesType;
  page: number;
  homeMoviesList: homeMovieListType[];
  totalPage: number;
  totalResult: number;
};
