import { ReactNode } from "react";

export type MovieType = {
  media_type: any;
  name: string;
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
export type dataAPItype = {
  created_by: any;
  runtime: any;
  status: ReactNode;
  tagline: ReactNode;
  dates?: datesType;
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
  media_type: any;
  name: string;
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
  genres: any[];
  crew: any[];
  cast: any[];
};
