import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  map,
  EMPTY,
  Observable,
  of,
  retry,
  throwError,
  filter,
  tap,
} from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

export interface SearchResponse {
  page: number;
  results: Movie[] | TVResponse[] | null | undefined;
  total_pages: number;
  total_results: number;
}

export interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface Movie {
  adult: string;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  media_type: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: Date;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  images: Images | [];
  videos: Videos | [];
  credits: Credits;
  external_ids: ExternalIds;
}
export interface ExternalIds {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}
export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCompanies {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}
export interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguages {
  iso_639_1: string;
  name: string;
}
export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface Images {
  backdrops: Backdrops[];
  posters: Posters[];
}

export interface Backdrops {
  aspect_ratio: number;
  file_path: string;
  height: string;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface Posters {
  aspect_ratio: number;
  file_path: string;
  height: string;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}
export interface Cast {
  adult: boolean;
  gender: number | null;
  id: number;
  know_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface Crew {
  adult: boolean;
  gender: number | null;
  id: number;
  know_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface TVResponse {
  backdrop_path: string | null;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: string;
  poster_path: string | null;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  seasons: Seasons[];
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
export interface Seasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: string;
}
export interface Networks {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}
export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}
export interface CreatedBy {
  id: number;
  credit_id: number;
  name: string;
  gender: number;
  profile_path: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private APIKEY: string = 'cc1a6dc48db32feee4a63568e93d81d3';
  firstPage: number = 1;
  private language: string = 'hu';
  private qSeparator: string = '&';
  private imageUrl: string = 'https://image.tmdb.org/t/p/w300';

  private fullUrl: string =
    'https://api.themoviedb.org/3/trending/movie/day?api_key=cc1a6dc48db32feee4a63568e93d81d3&language=hu-HU&page=';
  private baseUrl: string = 'http://api.themoviedb.org/3/';
  private movieType: string = 'movie/';
  private tvType: string = 'tv/';
  private popular: string = 'popular';
  private trending: string = 'trending/';
  private detailsUrl: string = 'https://api.themoviedb.org/3/movie/';
  private detailsPlusUrl: string =
    '&append_to_response=images,videos,credits,external_ids&include_image_language=en,null&include_video_language=hu,en';
  constructor(private http: HttpClient) {}
  movies(page: number): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      this.baseUrl +
        'trending/' +
        this.movieType +
        'day?api_key=' +
        this.APIKEY +
        '&language=' +
        this.language +
        '&page=' +
        page
    );
  }
  getTrending(media_type: string): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        this.trending +
        media_type +
        '/day?api_key=' +
        this.APIKEY +
        '&language=' +
        this.language
    );
  }
  getPopularMovies(page: number): Observable<TmdbResponse> {
    return this.http
      .get<TmdbResponse>(
        this.baseUrl +
          this.movieType +
          this.popular +
          '?api_key=' +
          this.APIKEY +
          this.qSeparator +
          'language=' +
          this.language +
          '&page=' +
          page
      )
      .pipe(
        catchError(() => {
          return throwError(() => new Error('API FAILED'));
        })
      );
  }

  getPopular(media_type: string, page: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        media_type +
        '/' +
        this.popular +
        '?api_key=' +
        this.APIKEY +
        '&language=' +
        this.language +
        '&page=' +
        page
    );
  }

  getTvDetails(id: number): Observable<any> {
    return this.http.get<TVResponse>(
      this.baseUrl +
        'tv/' +
        id +
        '?api_key=' +
        this.APIKEY +
        '&language=' +
        this.language
    );
  }

  getDetails(id: number, type: string): Observable<any> {
    return this.http
      .get<any>(
        this.baseUrl +
          type +
          '/' +
          id +
          '?api_key=' +
          this.APIKEY +
          '&language=' +
          this.language +
          this.detailsPlusUrl
      )
      .pipe(
        catchError(() => {
          return throwError(() => new Error('API FAILED'));
        })
      );
  }

  getSearched(name: string): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        'search/multi/?api_key=' +
        this.APIKEY +
        '&language=' +
        this.language +
        '&query=' +
        name
    );
  }
  getTvExternalIds(id: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'tv/' + id + '/external_ids?api_key=' + this.APIKEY
    );
  }

  getMovieExternalIds(id: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'movie/' + id + '/external_ids?api_key=' + this.APIKEY
    );
    /*  .pipe(
        map((res) => {
          console.log(res.imdb_id);
          return res.imdb_id;
        })
      );*/
  }

  getImdbId(id: string, type: string) {
    return this.http
      .get<any>(
        this.baseUrl + type + '/' + id + 'external_ids?api_key=' + this.APIKEY
      )
      .pipe(
        map((res) => {
          return res.imdb_id;
        })
      );
  }
}
